import { createClient } from "@supabase/supabase-js";

const url = "https://wgjggfvagrsxmwktsrxj.supabase.co";
const key = "sb_publishable_ZmIyhDcitMTENU-0QFRcLg_tDXjCAnq";

const supabase = createClient(url, key);

export default function uploadFile(file) {
  return new Promise((resolve, reject) => {
    const timeStamp = Date.now();
    const fileName = timeStamp + "_" + file.name;
    // supabase.storage.from("images").upload(fileName, file, {
    // 	cacheControl: "3600",
    // 	upsert: false,
    // }).then(
    //     ()=>{
    //         const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
    //         resolve(publicUrl);
    //     }
    // ).catch((error)=>{
    //     reject(error);
    // })
    supabase.storage
      .from("images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then((result) => {
        console.log("UPLOAD RESULT:", result);

        if (result.error) {
          console.log("SUPABASE ERROR:", result.error);
          reject(result.error);
          return;
        }

        const publicUrl = supabase.storage.from("images").getPublicUrl(fileName)
          .data.publicUrl;

        resolve(publicUrl);
      });
  });
}

// supabase password : TzAciWR0oCu2WNOX
