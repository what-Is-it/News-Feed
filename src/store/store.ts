import {defineStore} from 'pinia'
import {computed, ref, Ref} from 'vue'
import {axiosHabr, axios3d} from '../utils/axios.config'

export const useNewsStore = defineStore('news', {
    state: ()=>({
        parsedElementsHabr: ref([]),
        parsedElements3d: ref([]),
        vertical: ref(true)
    }),
    actions: {
        async getHabrNews() {
            try {
                await axiosHabr.get()
                .then((response)=>{
                    const parser = new DOMParser
                    const doc = parser.parseFromString(response.data, 'text/xml')
                    const items = doc.getElementsByTagName("item")
                    for (let item of items) {
                        const element = {}
                        element['parsedTitle'] = item.getElementsByTagName("title")[0].textContent
                        element['parsedDescription'] = item.getElementsByTagName("description")[0].textContent
                        element['parsedTime'] = new Date(item.getElementsByTagName("pubDate")[0].textContent).toLocaleDateString()
                        element['source'] = 'habr.com'

                        this.parsedElementsHabr.push(element)
                        }
                        console.log(items)
                }  
            )
            } catch(error) {
                console.log(error)
                return error
            }
        },
        async get3dNews() {
            try {
                await axios3d.get()
                .then((response)=>{
                        const parser = new DOMParser
                        const doc = parser.parseFromString(response.data, 'text/xml')
                        const items = doc.getElementsByTagName("item")
                        for (let item of items) {
                            const element = {}
                            element['parsedTitle'] = item.getElementsByTagName("title")[0].textContent
                            element['parsedDescription'] = item.getElementsByTagName("description")[0].textContent
                            element['parsedTime'] = new Date(item.getElementsByTagName("pubDate")[0].textContent).toLocaleDateString()
                            element['parsedImg'] =  item.getElementsByTagName("enclosure")[0].textContent
                            element['source'] = '3dnews.ru'

                            this.parsedElements3d.push(element)
                        }
            console.log(items)
            })
            } catch(error) {
                console.log(error)
                return error
            }
        }
    },
    getters: {
        getAllNews() {
            return this.parsedElements3d.concat(this.parsedElementsHabr)
        }
    }
})