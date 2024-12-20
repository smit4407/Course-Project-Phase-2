//This file contains various types used in the ratePackage function.

export interface ContributorResponse {
    total: number;
    author: {
        login: string;
    }
}

export interface NpmApiResponse {
    repository: {
        url: string;
    };
}

export interface ApiResponse<T> {
    data: T | null;
    error: string | null;
}

export interface LicenseInfo {
    key: string;
    name: string;
    spdxId: string;
    url: string;
}

export interface Readme {
    text: string;
}

export interface OpenIssueNode {
    createdAt: string;
    updatedAt: string;
    closedAt: string | null;
}

export interface ClosedIssueNode {
    createdAt: string;
    updatedAt: string;
    closedAt: string;
}

export interface OpenIssues {
    totalCount: number;
    nodes: OpenIssueNode[];
}

export interface ClosedIssues {
    totalCount: number;
    nodes: ClosedIssueNode[];
}

export interface Review {
    totalCount: number;
}

export interface PullRequestNode {
    createdAt: string;
    updatedAt: string;
    closedAt: string | null;
    reviews: Review | [];
}

export interface PullRequests {
    totalCount: number;
    nodes?: PullRequestNode[];
}

export interface examplesFolder {
    entries: {
        name: string;
        type: string;
    }[];
}

export interface RepositoryResponse {
    licenseInfo: LicenseInfo;
    readme: Readme;
    openIssues: OpenIssues;
    closedIssues: ClosedIssues;
    pullRequests: PullRequests;
    isArchived: boolean;
    examplesFolder: examplesFolder;
}

export interface GraphQLResponse {
    data: {
        repository: RepositoryResponse;
    }
}

// metrics.ts
export interface Metrics {
    RampUp: number | null;
    RampUpLatency: number | null;
    Correctness: number | null;
    CorrectnessLatency: number | null;
    BusFactor: number | null;
    BusFactorLatency: number | null;
    ResponsiveMaintainer: number | null;
    ResponsiveMaintainerLatency: number | null;
    LicenseScore: number | null;
    LicenseScoreLatency: number | null;
    GoodPinningPractice: number | null;
    GoodPinningPracticeLatency: number | null;
    PullRequest: number | null;
    PullRequestLatency: number | null;
    NetScore:  number | null;
    NetScoreLatency: number | null;
}

export interface WorkerResult {
    score: number;
    latency: number;
}