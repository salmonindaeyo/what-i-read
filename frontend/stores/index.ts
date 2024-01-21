import { defineStore } from 'pinia'

export const useMyStore = defineStore({
  id: 'myStore',
  state: () => ({
    n: 2,
    userData : {},
    isLogin : false,
    mangaList : []  as object[]
  }),

  getters: {
    double: (state) => state.n * 2,
  },

  actions: {
    async login(data : object) {
      try {
        const apiUrl = useRuntimeConfig().public.APIURL;
        const response = await fetch(`${apiUrl}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(data), 
        }); 
        if (response.ok) {
          const responseData = await response.json();
          localStorage.setItem('userData', JSON.stringify(responseData));
          this.setUserData(responseData);
          this.setIsLogin(true)

        } 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async register(data : object) {
      try {
        const apiUrl = useRuntimeConfig().public.APIURL;
        const response = await fetch(`${apiUrl}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(data), 
        }); 
    
        if (response.status === 201) {
          const responseData = await response.json();
          return { success: true, data: responseData };
        } else {
          const errorData = await response.json();
          return { success: false, error: errorData.message };
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        return { success: false, error: 'Network error' };
      }
    },
    setUserData(data : object) {
      this.userData = data
    },
    setIsLogin(data : boolean) {
      this.isLogin = data
    } ,
    clearMangaList(){
      this.mangaList = []  as object[]
    },
    async getMangaList() {
      try {
        const apiUrl = useRuntimeConfig().public.APIURL;
        const response = await fetch(`${apiUrl}/manga`, {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${this.userData.token}`, 
          },
        }); 
        if (response.ok) {
          const responseData = await response.json();
          this.mangaList = responseData.data
        } 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async addManga(data : object) {
      try {
        const apiUrl = useRuntimeConfig().public.APIURL;
        const response = await fetch(`${apiUrl}/addManga`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${this.userData.token}`
          },
          body: JSON.stringify(data), 
        }); 
    
        if (response.status === 201) {
          const responseData = await response.json();
          this.getMangaList()
          return { success: true, data: responseData };
        } else {
          const errorData = await response.json();
          return { success: false, error: errorData.message };
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        return { success: false, error: 'Network error' };
      }
    },
    async deleteManga(id : string) {
      try {
        const apiUrl = useRuntimeConfig().public.APIURL;
        const response = await fetch(`${apiUrl}/manga/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${this.userData.token}`, 
          },
        }); 
        if(response.status === 200) {
          this.getMangaList()
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
  
})