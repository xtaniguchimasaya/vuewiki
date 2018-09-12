class Api {
    public sessionToken?: string;
    constructor(sessionToken?: string) {
        this.sessionToken = sessionToken;
    }
}
interface AuthBody {
    sessionToken: string;
}
interface Api {
    auth(username: string, password: string): Promise<AuthBody | null>;
}
Api.prototype.auth = async function(username: string, password: string) {
    const body = new FormData();
    body.append("username", username);
    body.append("password", password);
    if (process.env.NODE_ENV === "development") {
        return { sessionToken: "development" };
    }
    const response = await fetch(`./auth`, {
        body, method: "POST",
    });
    if (response.status === 200) {
        const json = await response.json();
        return json;
    } else {
        return null;
    }
};
interface EditBody {
    content: string;
}
interface Api {
    edit(filename: string, content: Blob): Promise<EditBody | null>;
}
Api.prototype.edit = async function(filename: string, content: Blob) {
    if (this.sessionToken === undefined) {
        return null;
    }
    const body = new FormData();
    body.append("content", content);
    body.append("sessionToken", this.sessionToken);
    const response = await fetch(`./data/${filename}`, {
        body, method: "PUT",
    });
    if (response.status === 200) {
        const json = await response.json();
        return json;
    } else {
        return null;
    }
};
interface SourceBody {
    content: string;
}
interface Api {
    src(filename: string): Promise<SourceBody | null>;
}
Api.prototype.src = async function(filename: string) {
    const response = await fetch(`./data/${filename}`);
    if (response.status === 200) {
        const json = await response.json();
        return json;
    } else {
        return null;
    }
};
export default Api;
