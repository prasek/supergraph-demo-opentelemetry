const { typescript } = require('projen');
const project = new typescript.TypeScriptProject({
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
    '@opentelemetry/api@1.2',
    '@opentelemetry/core@1.6',
    '@opentelemetry/exporter-trace-otlp-http@0.32',
    '@opentelemetry/exporter-zipkin@1.6',
    '@opentelemetry/instrumentation@0.32',
    '@opentelemetry/instrumentation-http@0.32',
    '@opentelemetry/instrumentation-express@0.31',
    '@opentelemetry/instrumentation-graphql@0.30',
    '@opentelemetry/resources@1.6',
    '@opentelemetry/sdk-trace-base@1.6',
    '@opentelemetry/sdk-trace-node@1.6',
  ],
});

project.synth();
