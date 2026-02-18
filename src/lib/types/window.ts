export interface WindowDefinition {
  id: string;
  title: string;
  size: { width: number; height: number };
  constrainToPortal?: boolean;
  portalId?: string;
  content: {
    header?: any;
    body: any;
    footer?: any;
  };
}
