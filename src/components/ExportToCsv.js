import { ExportJsonCsv } from 'react-export-json-csv';
import { useEffect } from 'react';
export default function ExportToCsv(props) {
    const headers = [
        {
            key: 'firstname',
            name: 'First Name',
        },
        {
            key: 'lastname',
            name: 'Last Name',
        },
        {
            key: 'streetaddress',
            name: 'Street Address',
        },
        {
            key: 'postcode',
            name: 'Postcode',
        },
        {
            key: 'city',
            name: 'City',
        },
        {
            key: 'email',
            name: 'Email',
        },
        {
            key: 'phone',
            name: 'Phone Number',
        },
    ]

    const data = [

    ]
    useEffect(() => {
        exportJson();
    }, []);
    const exportJson = () => {
        for (var i = 0; i < props.customers.length; i++) {
            data.push(props.customers[i])
        }
    }
    return (
        <div >
            <ExportJsonCsv headers={headers} items={data} onClick={exportJson}>Load csv file</ExportJsonCsv>
        </div>
    );
}