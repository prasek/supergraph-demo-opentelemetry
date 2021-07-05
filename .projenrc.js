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
    '@opentelemetry/api',
    '@opentelemetry/core@0.22',
    '@opentelemetry/exporter-collector@0.22',
    '@opentelemetry/exporter-zipkin@0.22',
    '@opentelemetry/instrumentation@0.22',
    '@opentelemetry/instrumentation-http@0.22',
    '@opentelemetry/instrumentation-express@0.22',
    '@opentelemetry/instrumentation-graphql@0.22',
    '@opentelemetry/node@0.22',
    '@opentelemetry/resources@0.22',
    '@opentelemetry/tracing@0.22',
  ],
});

project.synth();
