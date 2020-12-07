import React, {useEffect, useState} from "react"
import {getDoctorInstitutions} from "../utils/backend";
import QRCodeListItem from "./QRCodeListItem";

export const QRCodeList = () => {
    const [doctorLocations, setDoctorLocations] = useState([]);
    const [expanded, setExpanded] = useState<string | false>(false);
    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        getDoctorInstitutions(String(localStorage.getItem("Token")))
            .then((response:any) => {
                setDoctorLocations(response.data);
            }).catch(error => {
            console.log(error);
        })
    }, [])


    return(
        <div>
            {doctorLocations.map((location : any) => (
                <div key={location.id}>
                    <QRCodeListItem id={location.id}
                                    name={"Location : " + location.name}
                                    description={"Description : " + location.description}
                                    expanded={expanded}
                                    handleChange={handleChange}
                    />
                </div>
            ))}
        </div>
    )
}