import supabaseClient from "./utils/supabaseClient.js";
import {useQuery} from '@tanstack/react-query';

export const useGetEducations = () => {
    return useQuery(
        ['Education'],
        getEducations,
        {}
    )
}

/**
 * Retrieve all educations.
 *
 * @return {Promise<{id: number, type: string, place: string, info: string, achievementDate: date}[]>}
 */
const getEducations = async () => {

    const {data, error} = await supabaseClient
        .from('Education')
        .select()
        .order('achievementDate', {ascending: true})

    if (error) {
        throw error
    }
    return data
}