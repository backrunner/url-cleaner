declare module '@gorhill/ubo-core' {
  export interface FilterList {
    name?: string;
    raw?: string;
    compiled?: string;
  }

  export interface MatchRequestDetails {
    originURL: string;
    url: string;
    type: string;
  }

  export interface FilterQueryDetails {
    originURL: string;
    url: string;
    frameType?: string;
    tabId?: number;
  }

  export interface FilterQueryResult {
    redirectURL?: string;
    directives?: unknown;
  }

  export interface Options {
    noPSL?: boolean;
    enableWASM?: boolean;
  }

  export class StaticNetFilteringEngine {
    public constructor();

    public useLists(lists: FilterList[]): Promise<void>;
    public matchRequest(details: MatchRequestDetails): number;
    public matchAndFetchModifiers(details: MatchRequestDetails, modifier: string): unknown;
    public hasQuery(details: MatchRequestDetails): boolean;
    public filterQuery(details: FilterQueryDetails): FilterQueryResult | undefined;
    public isBlockImportant(): boolean;
    public toLogData(): unknown;
    public createCompiler(parser?: unknown): unknown;
    public compileList(list: FilterList, compiler: unknown, writer: unknown, options?: unknown): string;
    public serialize(): Promise<string>;
    public deserialize(serialized: string): Promise<boolean>;

    public static create(options?: Options): Promise<StaticNetFilteringEngine>;
    public static release(): Promise<void>;
  }

  export function enableWASM(): Promise<boolean>;
  export function pslInit(raw?: string): unknown;
}
