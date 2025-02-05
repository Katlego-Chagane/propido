import { supabase } from "@/my-app/lib/supabase"
import type { Property, PropertyFormData } from "@/types/properties"

export async function createProperty(data: PropertyFormData, userId: string): Promise<Property> {
  try {
    const { data: property, error } = await supabase
      .from("properties")
      .insert([
        {
          ...data,
          user_id: userId,
          status: "active",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Supabase error creating property:", error)
      throw new Error(`Error creating property: ${error.message}`)
    }

    if (!property) {
      throw new Error("Failed to create property: No data returned")
    }

    return property
  } catch (error) {
    console.error("Unexpected error creating property:", error)
    throw error
  }
}

export async function uploadPropertyImage(file: File, propertyId: string): Promise<string> {
  try {
    const fileExt = file.name.split(".").pop()
    const fileName = `${propertyId}.${fileExt}`
    const filePath = `property-images/${fileName}`

    const { error: uploadError } = await supabase.storage.from("properties").upload(filePath, file)

    if (uploadError) {
      console.error("Error uploading image:", uploadError)
      throw new Error(`Error uploading image: ${uploadError.message}`)
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("properties").getPublicUrl(filePath)

    // Update property with image URL
    const { error: updateError } = await supabase
      .from("properties")
      .update({ image_url: publicUrl })
      .eq("id", propertyId)

    if (updateError) {
      console.error("Error updating property with image URL:", updateError)
      throw new Error(`Error updating property with image URL: ${updateError.message}`)
    }

    return publicUrl
  } catch (error) {
    console.error("Unexpected error in uploadPropertyImage:", error)
    throw error
  }
}

