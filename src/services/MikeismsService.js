class MikeismsService {
  baseURL = `https://shit-mike-says-bingo-default-rtdb.firebaseio.com`;

  async getSayings() {
    const res = await fetch(`${this.baseURL}/mikeisms.json`);
    let data = await res.json();
    data = data || {};
    
    // Print to Console as a backup
    console.log(
      `Current Sayings in DB:\n`,
      Object.values(data)
        .map((x) => x.saying)
        .filter((x) => !!x)
        .join("\n")
    );
    return data;
  }

  async saveSaying(saying = "") {
    if (!saying) {
      return;
    }

    const res = await fetch(`${this.baseURL}/mikeisms.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        saying,
        created: new Date(),
      }),
    });

    const json = await res.json();
    const id = json.name;
    return id;
  }

  async deleteSaying(id) {
    return fetch(`${this.baseURL}/mikeisms/${id}.json`, {
      method: "DELETE",
    });
  }

  formatAsList(rawSayings = {}) {
    return Object.keys(rawSayings).map((id) => {
      const { saying, created } = rawSayings[id];
      return {
        id,
        saying,
        created,
      };
    });
  }
}

export default MikeismsService;
