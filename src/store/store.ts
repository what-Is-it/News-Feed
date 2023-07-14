import {defineStore} from 'pinia'
import {computed, ref, Ref} from 'vue'
import {axiosHabr, axios3d} from '../utils/axios.config'
import {AxiosResponse} from 'axios'
import { INews } from '../types/types'

export const useNewsStore = defineStore('news', {
    state: ()=>({
        parsedElementsHabr: ref([]) as Ref<INews[]>,
        parsedElements3d: ref([]) as Ref<INews[]>,
    }),
    actions: {
        async getHabrNews():Promise<void> {
            this.parsedElementsHabr = []
            try {
                await axiosHabr.get()
                .then((response:AxiosResponse)=>{
                    const parser = new DOMParser
                    const doc = parser.parseFromString(response.data, 'text/xml')
                    const items = doc.getElementsByTagName("item")
                    
                    for (let item of items) {
                        const element = {} as INews
                        element['parsedTitle'] = item.getElementsByTagName("title")[0].textContent
                        element['parsedDescription'] = item.getElementsByTagName("description")[0].textContent
                        element['parsedTime'] = new Date(item.getElementsByTagName("pubDate")[0].textContent).toLocaleDateString()
                        element['source'] = 'habr.com'

                        this.parsedElementsHabr.push(element)
                        }
                }  
            )
            } catch(error) {
                console.log(error)
            }
        },
        async get3dNews():Promise<void> {
            this.parsedElements3d = []
            try {
                await axios3d.get()
                .then((response:AxiosResponse)=>{
                        const parser = new DOMParser
                        const doc = parser.parseFromString(response.data, 'text/xml')
                        const items = doc.getElementsByTagName("item")
                        for (let item of items) {
                            const element = {} as INews
                            element['parsedTitle'] = item.getElementsByTagName("title")[0].textContent
                            element['parsedDescription'] = item.getElementsByTagName("description")[0].textContent
                            element['parsedTime'] = new Date(item.getElementsByTagName("pubDate")[0].textContent).toLocaleDateString()
                            element['parsedImg'] =  item.getElementsByTagName("enclosure")[0].attributes[0].textContent
                            element['source'] = '3dnews.ru'

                            this.parsedElements3d.push(element)
                        }
            })
            } catch(error) {
                console.log(error)
            }
        }
    },
    getters: {
        getAllNews(): INews[] {
            return this.parsedElements3d.concat(this.parsedElementsHabr)
        }
    }
})