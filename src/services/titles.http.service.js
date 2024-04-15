const urlApi = "https://api.watchmode.com/v1"
const keyApi = "apiKey=nXInA93rMPfvlBM33kkepHGa2wK8kiKrnwi36Scf"


const newTitle = async () => {
    try {
        const response = await fetch(`${urlApi}/releases/?${keyApi}&limit=23`)
        if (!response.ok) {
            throw new Error("Erro na busca dos lançamentos")
        }
        const dataTotal = await response.json()
        const data = dataTotal.releases
        return data
    } catch (error) {
        console.log(error);
    }
}

export {newTitle}