import {useState, useEffect} from "react";
import {useRouter} from "next/router";

import cookieCutter from "cookie-cutter";

const useJwt = () => {
  const router = useRouter();

  const [jwt, setJwt] = useState(null);
  useEffect(()=>{
    const jwtFromCookie = cookieCutter.get("jwt");
    if(jwtFromCookie){
      setJwt(JSON.parse(jwtFromCookie));
    }
  }, [])

  useEffect(()=>{
    if(jwt){
      cookieCutter.set("jwt", JSON.stringify(jwt));
    }
    else {
      cookieCutter.set("jwt", "", {expires: new Date(0)})
    }
  }, [jwt])
  
  return {
    jwt: jwt,
    setJwt: setJwt
  }
}

export default useJwt;