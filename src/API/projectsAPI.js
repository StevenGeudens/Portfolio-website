import supabaseClient from "./utils/supabaseClient.js";
import {useQuery} from '@tanstack/react-query';

export const useGetProjects = () => {
    return useQuery(
        ['Project'],
        getProjects,
        {}
    )
}

export const useGetProjectById = ({id}) => {
    return useQuery(
        ['Project', id],
        () => getProjectById({id}),
        {}
    )
}

/**
 * Retrieve all projects.
 *
 * @return {Promise<{id: number, github: string, link: string, isFeatured: bool, type: string, summary: string, title: string}[]>}
 */
const getProjects = async () => {

    const {data, error} = await supabaseClient
        .from('Project')
        .select(`*, Image(*)`)
        .order('isFeatured', {ascending: false})

    if (error) {
        throw error
    }
    return data
}

/**
 * Retrieve a project by id.
 *
 * @return {Promise<{id: number, github: string, link: string, isFeatured: bool, type: string, summary: string, title: string}>}
 */
const getProjectById = async ({id}) => {

    const {data, error} = await supabaseClient
        .from('Project')
        .select(`*, Image(*)`)
        .order('order', {foreignTable: 'Image', ascending: true})
        .eq('id', id)
        .single()

    if (error) {
        throw error
    }
    return data
}