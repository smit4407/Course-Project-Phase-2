//This file contains utility functions for handling URLs.

import { fetchGithubUrlFromNpm } from '../api/npmApi';

export const extractDomainFromUrl = (url: string): string | null => {
    // unsure if we would receive a url without this
    if(url == null) {
        console.error('URL is null');
        return null;
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }

    try {
        const parsedUrl = new URL(url);
        return parsedUrl.hostname;
    } catch (error) {
        console.error('Invalid URL:', error);
        return null;
    }
}

export const extractNpmPackageName = (npmUrl: string): string | null => {
    if (!npmUrl) {
        console.error('npmUrl is undefined or empty');
        return null;
    }

    const parts = npmUrl.split('/');
    const packageName = parts.pop();

    if (!packageName) {
        console.error('Unable to extract package name from URL');
        return null;
    }

    return packageName;
};

export const extractGithubOwnerAndRepo = (repoURL: string): [string, string] | null => {
    const parts = repoURL.split('/').slice(3);

    if (parts.length < 2) {
        console.error('repoURL does not contain enough parts');
        return null;
    }

    let [owner, repo] = parts;

    // Remove '.git' from the repo name if present
    if (repo.endsWith('.git')) {
        repo = repo.slice(0, -4); // Remove the last 4 characters (".git")
    }

    return [owner, repo];
};


export async function getRepoDetails(token: string, inputURL: string): Promise<[string, string, string]> {
    // Remove 'git+' prefix if it exists
    let sanitizedURL = inputURL.startsWith("git+") ? inputURL.slice(4) : inputURL;

    console.log('Sanitized URL:', sanitizedURL);

    // Extract hostname (www.npm.js or github.com or null)
    const hostname = extractDomainFromUrl(sanitizedURL);
    if (!hostname || (hostname !== "www.npmjs.com" && hostname !== "github.com")) {
        console.log('Invalid URL');
        process.exit(1);
    }

    let repoURL: string = "";

    // If URL is npm, fetch the GitHub repo
    if (hostname === "www.npmjs.com") {
        const npmPackageName = extractNpmPackageName(sanitizedURL);
        if (!npmPackageName) {
            console.log('Invalid npm package name');
            process.exit(1);
        }

        // Fetch the GitHub repo URL from npm package
        const npmResponse = await fetchGithubUrlFromNpm(npmPackageName);
        if (!npmResponse?.data) {
            console.log('Unable to fetch GitHub URL from npm');
            process.exit(1);
        }

        repoURL = npmResponse.data;
    } else {
        // URL must be GitHub, so use it directly
        repoURL = sanitizedURL;
    }

    const repoDetails = extractGithubOwnerAndRepo(repoURL);
    if (!repoDetails) {
        console.log('Could not extract owner and repo from URL');
        process.exit(1);
    }

    const extendedDetails: [string, string, string] = [...repoDetails, repoURL];

    return extendedDetails;
}
