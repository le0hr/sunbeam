import urllib.parse

import httpx

from utils.oauth import OAuth


class WooCommerceClient:
    def __init__(
        self,
        base_url: str,
        consumer_key: str,
        consumer_secret: str,
        version: str = "wc/v3",
        timeout: int = 3000,
    ):
        self.base_url = base_url.rstrip("/")
        self.consumer_key = consumer_key
        self.consumer_secret = consumer_secret
        self.version = version

        self.client = httpx.AsyncClient(timeout=timeout)

    def _build_signed_url(
        self,
        endpoint: str,
        method: str,
        params: dict | None = None,
    ) -> str:
        url = f"{self.base_url}/wp-json/{self.version}{endpoint}"

        if params:
            url += "?" + urllib.parse.urlencode(params)

        oauth = OAuth(
            url=url,
            consumer_key=self.consumer_key,
            consumer_secret=self.consumer_secret,
            version=self.version,
            method=method,
        )

        return oauth.get_oauth_url()

    async def get(
        self,
        endpoint: str,
        params: dict | None = None,
        with_pages_data: bool = False
    ):
        url = self._build_signed_url(
            endpoint,
            "GET",
            params,
        )

        response = await self.client.get(url)

        print("STATUS:", response.status_code, flush=True)
        print("BODY:", response.text, flush=True)

        response.raise_for_status()

        body = response.json()

        if not with_pages_data:
            return body

        return (
            body,
            {
                "total": int(response.headers.get("X-WP-Total", 0)),
                "total_pages": int(response.headers.get("X-WP-TotalPages", 0)),
            },
        )

    async def post(
        self,
        endpoint: str,
        data: dict,
    ):
        url = self._build_signed_url(
            endpoint,
            "POST",
        )

        response = await self.client.post(
            url,
            json=data,
        )

        print(response.status_code, flush=True)
        print(response.text, flush=True)
        
        response.raise_for_status()

        return response.json()

    async def put(
        self,
        endpoint: str,
        data: dict,
    ):
        url = self._build_signed_url(
            endpoint,
            "PUT",
        )

        response = await self.client.put(
            url,
            json=data,
        )

        response.raise_for_status()

        return response.json()

    async def delete(
        self,
        endpoint: str,
    ):
        url = self._build_signed_url(
            endpoint,
            "DELETE",
        )

        response = await self.client.delete(url)

        response.raise_for_status()

        return response.json()

    async def close(self):
        await self.client.aclose()