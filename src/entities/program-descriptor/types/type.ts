
export type ProgramVersion = {
  gtnhVersion: string;
  configDescriptorUrl: string;
  tag?: string;
}

export type ProgramDescriptor = {
  name: string;
  description: string;
  repository: string;
  archiveName: string;
  lastSupportedGtnhVersion?: string;
  versions: ProgramVersion[];
}