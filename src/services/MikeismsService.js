class MikeismsService {
    baseURL = `https://shit-mike-says-bingo-default-rtdb.firebaseio.com`

    async getSayings() {
        console.log(`getSayings()`)
        const res = await fetch(`${this.baseURL}/mikeisms.json`)
        const data = await res.json()
        return data
    }

    async saveSaying(data) {
        console.log(`saveSaying()`, data)
        const res = await fetch(`${this.baseURL}/mikeisms.json`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        const json = await res.json()
        const id = json.name
        return id

    }

    // async deleteDummyData(id) {
    //     return fetch(`${this.baseURL}/dummy/${id}.json`, {
    //         method: 'DELETE'
    //     })
    // }
}

export default MikeismsService