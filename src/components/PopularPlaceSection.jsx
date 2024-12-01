import { MapPin } from 'lucide-react'
import React from 'react'

const PopularPlaceSection = ({movies}) => {
  return (
    <ul className="mt-5">
          <p className="text-lg font-medium ml-2">Popular places</p>
          {
            // eslint-disable-next-line react/prop-types
            movies?.slice(10,18)?.map((movie,id)=>{
              return (
                <li key={movie.title+id} className="py-3 px-2 flex items-center justify-start gap-3 cursor-pointer hover:bg-slate-100 rounded-xl">
                  <MapPin  className={"w-4 h-4"}/>
                  <p>{movie.locations}</p>
                </li>
              )
            })
          }
        </ul>
  )
}

export default PopularPlaceSection