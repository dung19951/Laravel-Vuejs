import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function useCompanies() {
    const company = ref([])
    const companies = ref([])

    const errors = ref('')
    const router = useRouter()

    const getCompanies = async() => {
        let response = await axios.get('/api/')
        companies.value = response.data
    }

    const getCompany = async(id) => {
        let response = await axios.get(`/api/${id}`)
        company.value = response.data
    }

    const storeCompany = async(data) => {
        errors.value = ''
        try {
            await axios.post('/api/store', data)
            await router.push({ name: 'companies.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + ' ';
                }
            }
        }

    }

    const updateCompany = async(id) => {
        errors.value = ''
        try {
            await axios.patch(`/api/${id}`, company.value)
            await router.push({ name: 'companies.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + ' ';
                }
            }
        }
    }
    const destroyCompany = async(id) => {
        await axios.delete(`/api/${id}`)
    }

    return {
        errors,
        company,
        companies,
        getCompany,
        getCompanies,
        storeCompany,
        updateCompany,
        destroyCompany
    }
}