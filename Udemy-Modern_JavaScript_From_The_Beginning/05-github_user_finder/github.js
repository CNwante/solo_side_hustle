// Create GitHub class
class GitHub {
    constructor() {
        this.client_id = "dccfc2fd3ddd93325697";
        this.client_secret = "66915ddec0e21921a45c80c752eb0b5097247ee1";
        this.repos_count = 8;
        this.repos_sort = "created: asc";
    }

    async getUser(user) {
        const userProfile = await fetch(`https://api.github.com/users/${user}
        ?client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const userRepos = await fetch(`https://api.github.com/users/${user}
        /repos?per_page=${this.repos_count}&sort=${this.repos_sort}
        &client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const profile = await userProfile.json();

        const repos = await userRepos.json();
        return {
            profile,
            repos
        }
    }
}
