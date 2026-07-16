import type { GitHubPushWebhookPayload } from "../../types/github-push.ts";

export function push(commitData: GitHubPushWebhookPayload, logoUrl: boolean = false, colorUrl?: string): DiscordMessage {
    const isPlural = commitData.commits.length > 1;
    const avatar = `${commitData.sender.avatar_url}&t=${Date.now()}`;
    return {
        embeds: [{
            title: `[${commitData.repository.name}:${commitData.ref.replace('refs/heads/', '')}] - ${commitData.commits.length} new commit${isPlural ? 's' : ''}`,
            url: commitData.compare,
            description: commitData.commits.map(data => {
                const isLong = data.message.length > 47
                return `[\`${data.id.substring(0, 6)}\`](${data.url}) ${isLong ? data.message.substring(0,46) : data.message}${isLong && '...'}`
            }).join('\n'),
            author: {
                icon_url: avatar,
                name: commitData.sender.login
            }
        }]
    }
}