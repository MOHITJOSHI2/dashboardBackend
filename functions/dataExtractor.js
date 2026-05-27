// Library to interact with excel files.
const xlsx = require('xlsx')
const path = require("path")

const extractData = () => {

    const filePath = path.join(__dirname, '../DWSSM_KPI_GIS_Ready .xlsx')
    const workbook = xlsx.readFile(filePath)

    let WSUCData = {}

    // Spatial Data (BASE)
    const Spatial_sheet = workbook.Sheets['Spatial']
    const Spatial_data = xlsx.utils.sheet_to_json(Spatial_sheet)

    Spatial_data.forEach((row) => {
        WSUCData[row.WSUC_ID] = {
            WSUC_ID: row.WSUC_ID,
            WSUC_Name: row.WSUC_Name,

            Location: {
                Province_Name: row.Province_Name || null,
                District_Name: row.District_Name || null,
                Municipality_Type: row.Municipality_Type || null,
                Municipality_Name: row.Municipality_Name || null,
                Wards_Covered: row.Wards_Covered || null,
            },

            Service_Coverage_Prerequisite: null,
            Summary_Index: {}
        }
    })

    // Service coverage
    const Service_Coverage_Sheet = workbook.Sheets['Service Coverage']
    const Service_Coverage_data = xlsx.utils.sheet_to_json(Service_Coverage_Sheet)

    Service_Coverage_data.forEach((row) => {
        if (WSUCData[row.WSUC_ID]) {
            WSUCData[row.WSUC_ID].Service_Coverage_Prerequisite =
                row['Prerequisite: Does Business Plan exist?'] || null
        }
    })

    const Summary_Index_Sheet = workbook.Sheets['Summary_Index']

    // A5 → A72 (WSUC IDs)
    const idRange = {
        s: { r: 4, c: 0 },
        e: { r: 78, c: 0 }
    }

    const ids = xlsx.utils.sheet_to_json(Summary_Index_Sheet, {
        range: idRange,
        header: 1
    }).map(row => row[0])

    // Full data (skip top junk rows)
    const Summary_Index_Data = xlsx.utils.sheet_to_json(Summary_Index_Sheet, {
        range: 3,
        defval: null
    })

    const cleanNumber = (val) => {
        if (val === null || val === undefined || val === "") return null

        if (typeof val === "number") return val

        const num = parseFloat(String(val).replace(/[^\d.]/g, ""))
        return isNaN(num) ? null : num
    }


    Summary_Index_Data.forEach((row, index) => {

        const wsucId = ids[index]

        if (WSUCData[wsucId]) {
            WSUCData[wsucId].Summary_Index = {

                Service_Coverage_Score: cleanNumber(row['Service\r\nCoverage\r\n(wt 0.25)'] || null),
                Adequacy_Score: cleanNumber(row['Adequacy\r\n(wt 0.20)'] || null),
                Water_Quality_Score: cleanNumber(row['Water\r\nQuality\r\n(wt 0.35)'] || null),
                Reliability_Score: cleanNumber(row['Reliability\r\n(wt 0.20)'] || null),
                NRW_Score: cleanNumber(row['NRW\r\n(wt 0.30)'] || null),
                OM_Score: cleanNumber(row['O&M Ratio\r\n(wt 0.25)']),
                Metering_Ratio_Score: cleanNumber(row['Metering\r\n(wt 0.20)'] || null),
                Grievance_Score: cleanNumber(row['Grievance\r\n(wt 0.25)'] || null),

                SPI: cleanNumber(row['SPI\r\n(%)'] || null),
                OEI: cleanNumber(row['OEI\r\n(%)'] || null),

                // Optional fields (keep as string)
                CWPI_Percentage: row.CWPI_Percentage || null,
                CWPI_Interpretation: row.CWPI_Interpretation || null,
                Type_A_to_D: row.Type_A_to_D || null,
            }
        }
    })

    return WSUCData
}

module.exports = { extractData }