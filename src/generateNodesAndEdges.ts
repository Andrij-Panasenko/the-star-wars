import { Character, Film, Starship } from "types/types";

export interface GenerateNodesAndEdgesProps {
   characterData: Character | null;
   filmsData: Film[];
   starshipsData: Starship[];
}

export default function GenerateNodesAndEdges({ characterData, filmsData, starshipsData}:GenerateNodesAndEdgesProps) {

   //chacter node
   const characterNode = {
     id: characterData?.id.toString() || 'unknown-id',
     position: { x: 550, y: 0 },
     data: { label: characterData?.name || 'Unknown Character' },
   };
   
   //transform films and starships details into array to pass necesary details to ReactFlow
   const filmNodes = filmsData.map((film, idx) => {
      return {
         id: film.id.toString(),
         position: { x: idx * 180, y: 250 },
         data: { label: film.title },
      }
   });
    
   const starshipNodes = starshipsData.map((starship, idx) => {
      return {
         id: starship.id.toString(),
         position: { x: idx * 180, y: 500 },
         data: { label: starship.model },
      };
   });

   //making edges to connect character node with films
   const filmEdges = filmsData.map((film) => {
      return {
         id: `char-to-film-${film.id}`,
         source: characterNode.id,
         target: film.id.toString(),
         label: 'film',
      };
   });
   
       //edges from films to starships
   const starshipEdges = starshipsData.map((starship) => {
      return {
         id: `film-to-starship-${starship.id}`,
         source:
            filmsData
               .find((film) => film.starships.includes(starship.id))
               ?.id.toString() || '',
         target: starship.id.toString(),
         label: 'starship',
      };
   });
   
   return {
      nodes: [characterNode, ...filmNodes, ...starshipNodes],
      edges:[...filmEdges, ...starshipEdges],
      // characterNode,
      // filmNodes,
      // starshipNodes,
      // filmEdges,
      // starshipEdges
   }
}



