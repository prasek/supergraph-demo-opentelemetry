import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';

import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import {
  Instrumentation,
  registerInstrumentations,
} from '@opentelemetry/instrumentation';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';

import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { Resource } from '@opentelemetry/resources';
import { BatchSpanProcessor, ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';


enum GraphNodeType {
  Router = 'router',
  Subgraph = 'subgraph',
}

enum ExporterType {
  Console = 'console',
  Zipkin = 'zipkin',
  Collector = 'collector',
}

export interface ApolloOpenTelemetryExporterProps {
  readonly type: ExporterType;
  readonly host?: string;
  readonly port?: string;
}


export interface ApolloOpenTelemetryProps {
  readonly type: GraphNodeType;
  readonly name?: string;
  readonly exporter?: ApolloOpenTelemetryExporterProps;
  readonly debug?: boolean;
}

export class ApolloOpenTelemetry {
  private props: ApolloOpenTelemetryProps

  public constructor(props: ApolloOpenTelemetryProps) {
    this.props = props;

    if (props.debug) {
      diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);
    }
  }

  public setupInstrumentation() {
    const name = this.props.name ?? this.props.type;
    const resource = new Resource({
      'service.name': name,
    });

    const instrumentations: Instrumentation[] = [];
    switch (this.props.type) {
      case GraphNodeType.Router:
        instrumentations.push( new HttpInstrumentation() );
        instrumentations.push( new ExpressInstrumentation() );
        break;

      case GraphNodeType.Subgraph:
        instrumentations.push( new HttpInstrumentation() );
        instrumentations.push( new ExpressInstrumentation() );
        instrumentations.push(
          new GraphQLInstrumentation({
            allowValues: true,
            depth: 10,
          }),
        );
        break;

      default:
        throw new Error(`unknown graph node type: '${this.props.type}'`);
    }

    registerInstrumentations({
      instrumentations: [instrumentations],
    });
    const provider = new NodeTracerProvider({
      resource: Resource.default().merge(resource),
    });

    const exporter = this.props.exporter;
    const exporterType = exporter?.type ?? ExporterType.Console;
    const host = exporter?.host ?? 'localhost';

    switch (exporterType) {
      case ExporterType.Console:
        const consoleExporter = new ConsoleSpanExporter();
        provider.addSpanProcessor(
          new SimpleSpanProcessor(consoleExporter),
        );

        break;

      case ExporterType.Zipkin:
        const zipkinPort = exporter?.port ?? '9411';

        const zipkinExporter = new ZipkinExporter({
          url: `http://${host}:${zipkinPort}/api/v2/spans`,
        });
        provider.addSpanProcessor(
          new SimpleSpanProcessor(zipkinExporter),
        );

        break;

      case ExporterType.Collector:
        const collectorPort = exporter?.port ?? '4318';

        const collectorTraceExporter = new OTLPTraceExporter({
          url: `http://${host}:${collectorPort}/v1/traces`,
        });
        provider.addSpanProcessor(
          new BatchSpanProcessor(collectorTraceExporter, {
            maxQueueSize: 1000,
            scheduledDelayMillis: 1000,
          }),
        );
        break;

      default:
        throw new Error(`unknown exporter type: '${exporterType}'`);
    }
    provider.register();
  }
}
