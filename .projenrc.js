const { TypeScriptProject, Publisher } = require('projen');
const project = new TypeScriptProject({
  authorName: 'Phil Prasek',
  authorAddress: 'prasek@gmail.com',
  license: 'MIT',
  packageName: 'supergraph-demo-opentelemetry',
  description: 'Open Telemetry instrumentation for Apollo Server and Apollo Gateway',
  repository: 'https://github.com/prasek/supergraph-demo-opentelemetry.git',
  name: 'supergraph-demo-opentelemetry',
  projectType: 'library',
  defaultReleaseBranch: 'main',
  releaseToNpm: true,
  deps: [
    '@opentelemetry/api@1.0',
    '@opentelemetry/core@1.0',
    '@opentelemetry/exporter-trace-otlp-http@0.27',
    '@opentelemetry/exporter-zipkin@1.0',
    '@opentelemetry/instrumentation@0.27',
    '@opentelemetry/instrumentation-http@0.27',
    '@opentelemetry/instrumentation-express@0.27',
    '@opentelemetry/instrumentation-graphql@0.27',
    '@opentelemetry/resources@1.0',
    '@opentelemetry/sdk-trace-base@1.0',
    '@opentelemetry/sdk-trace-node@1.0',
  ],
});

project.synth();
