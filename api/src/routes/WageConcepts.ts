import { Response, Request, Router, NextFunction } from "express";
import { json } from "stream/consumers";
import { WageConcept } from "../models/WageConcept";
import {User} from "../models/User"
const router = Router();


router.get("/:cuil", async (req: Request, res: Response, next: NextFunction) => {
    const cuil = req.params.cuil;
    const actualYear = new Date().getFullYear()
   
    //THIS DATA CAME FROM WAGECONCEPTS DB
    const basico =  1785.83 
    const descripcion = "SUELDO BASICO"

    //this data came from IDK
    const cant =   63071.51 
    const asignaciones_familiares= ''
    const remunerativos =   14881.98 
    const no_remunerativos =   4430.37 
    const deducciones = ''

    let selected_user = await User.findByPk(cuil)

    if (selected_user){
      let wageConcepts_of_User = {
        description : descripcion,
        quantity: cant,
         
      }
    }

    

    //Brings all the wage Concepts from DB
    // WageConcept.findAll()
    // .then((concept) => {
    //     return res.json(concept);
    //   })
    //   .catch((error) => {
    //     return res.status(404).send(error);
    //   });
 
    
    

  });


  export default router;