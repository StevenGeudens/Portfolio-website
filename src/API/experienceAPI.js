import supabaseClient from "./utils/supabaseClient.js";
import {useQuery} from '@tanstack/react-query';

export const useGetExperiences = () => {
    return useQuery(
        ['Experience'],
        getExperiences,
        {}
    )
}

/**
 * Retrieve all experiences.
 *
 * @return {Promise<{id: number, position: string, company: string, companyLink: string, address: string, work: string, startDate: date, endDate: date}[]>}
 */
const getExperiences = async () => {

    const {data, error} = await supabaseClient
        .from('Experience')
        .select()
        .order('endDate', {ascending: true})

    if (error) {
        throw error
    }
    return data
}