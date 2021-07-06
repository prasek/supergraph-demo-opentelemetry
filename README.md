# supergraph-demo-opentelemetry

Open Telemetry instrumentation for Apollo Server and Apollo Gateway for use in the [apollographql/supergraph-demo](https://github.com/apollographql/supergraph-demo).

## Basic Usage

See working usage in the [https://github.com/apollographql/supergraph-demo](https://github.com/apollographql/supergraph-demo).

### Apollo Gateway - Distributed Tracing

```ts
new ApolloOpenTelemetry({
  type: 'router',
  name: 'router',
  exporter: {
    type: 'zipkin', // console, zipkin, collector, ...
    host: 'localhost', // default: localhost
    port: '9411', // default: exporter specific
  }
}).setupInstrumentation();
```

### Apollo Server - Distributed Tracing

```ts
new ApolloOpenTelemetry({
  type: 'subgraph',
  name: 'inventory',
  exporter: {
    type: 'zipkin', // console, zipkin, collector, ...
    host: 'localhost', // default: localhost
    port: '9411', // default: exporter specific
  }
}).setupInstrumentation();
```

## Learn More

[Apollo Federation Open Telemetry Docs](https://www.apollographql.com/docs/federation/opentelemetry/)
