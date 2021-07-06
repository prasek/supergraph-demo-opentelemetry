# supergraph-demo-opentelemetry

Helper library for [Open Telemetry](https://opentelemetry.io/) instrumentation
and distributed tracing in Apollo Federation using Apollo Gateway and Apollo
Server.

See [Apollo Federation Open Telemetry
Docs](https://www.apollographql.com/docs/federation/opentelemetry/) for details
on Open Telemetry support in Apollo Federation.

See
[apollographql/supergraph-demo](https://github.com/apollographql/supergraph-demo)
for a working demo using this library:

![opentelemetry](docs/media/opentelemetry.png)

## Basic Usage

See working example in the
[apollographql/supergraph-demo](https://github.com/apollographql/supergraph-demo).

### Apollo Gateway

Add this before you even import `apollo-server`, `express`, or `http`.
Otherwise, your trace data will be incomplete.

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

Apollo Gateway does trace context propagation so the subgraphs in a Apollo
Federation can do distributed tracing.

### Apollo Server

Add this before you even import `apollo-server`, `express`, or `http`.
Otherwise, your trace data will be incomplete.

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
