import {supabase} from "@/lib/supabaseClient";

const supabaseClient = supabase;

export const GetAllExperiences = async () => {
    let {data} = await supabaseClient.from('Experience').select().order('endDate', {ascending: true});
    return data;
}

export const GetAllEducations = async () => {
    let {data} = await supabase.from('Education').select().order('achievementDate', {ascending: true});
    return data;
}

export const GetAllProjects = async () => {
    let {data} = await supabase.from('Project').select(`*, Image(*)`).order('isFeatured', {ascending: false});
    return data;
}

export const GetProjectById = async (id) => {
    let {data} = await supabase.from('Project').select(`*, Image(*)`)
        .order('order', {foreignTable: 'Image', ascending: true})
        .eq('id', id).single();
    return data;
}