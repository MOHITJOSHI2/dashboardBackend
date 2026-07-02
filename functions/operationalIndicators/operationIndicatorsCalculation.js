const serviceCoverageScore = (serviceCoverageData) => {
    let serviceCoverage = 0

    const c = (serviceCoverageData.KPI_1 / serviceCoverageData.KPI_2) * 100
    if (c == 100) {
        serviceCoverage = 1.00
    } else if (c > 60 && c < 100) {
        serviceCoverage = (c - 60) / 40
    } else {
        serviceCoverage = 0.00
    }

    return serviceCoverage
}

const adequacyScore = (adequacyData) => {
    let adequacy = 0
    const LPCD = (adequacyData.KPI_2 * 1000) / (adequacyData.KPI_3 * 30)

    // For Pumped schema
    if (adequacyData.KPI_1 == 'Pumped') {
        if (LPCD >= 100) {
            adequacy = 1.00
        } else if (LPCD >= 45 && LPCD < 100) {
            adequacy = (LPCD - 45) / 55
        } else {
            adequacy = 0.00
        }
    }

    //For gravity Schema
    if (adequacyData.KPI_1 == 'Gravity Flow') {
        if (LPCD >= 120) {
            adequacy = 1.00
        } else if (LPCD >= 45 && LPCD < 120) {
            adequacy = (LPCD - 45) / 45
        } else {
            adequacy = 0.00
        }
    }

    return adequacy

}

const waterQualityScore = (waterQualityData) => {
    let waterQuality = 0

    if (waterQualityData.KPI_2 === 'Yes') {
        waterQuality += 0.20;
    }

    if (waterQualityData.KPI_3 === 'Yes') {
        waterQuality += 0.30;
    }

    if (waterQualityData.KPI_4 === 'Yes') {
        waterQuality += 0.30;
    }

    if (waterQualityData.KPI_5 === 'Yes') {
        waterQuality += 0.20;
    }

    return waterQuality
}

const reliabilityScore = (reliabilityData) => {
    let reliability = 0

    //reliability score in %
    const rs = (reliabilityData.KPI_2 / 24) * 100

    if (rs >= 24) {
        reliability = 1.00

    } else if (rs > 3 && rs < 24) {
        reliability = (rs - 3) / 21

    } else if (rs == 3) {
        reliability = 0.50

    } else {
        reliability = 0.00

    }

    return reliability;

}

const nrwScore = (nrwData) => {

}

const omScore = (omData) => {
    let om = 0;

    const or = (omData.KPI_2 / omData.KPI_3).toFixed(5)

    if (or <= 0.70) {
        om = 1.00

    } else if (or > 0.70 && or < 1.20) {
        om = (1.20 - or) / 0.50

    } else {
        om = 0.00
    }

    return om
}

const meteringRatio = (meteringData) => {
    let metering = 0;

    const mr = meteringData.KPI_1 / meteringData.KPI_2
    if (mr == 100) {
        metering = 1

    } else if (mr > 60 && mr < 100) {
        metering = (mr - 60) / 40

    } else {
        metering = 0
    }
}

const grievanceAddressal = (grievanceData) => {
    let grievance = 0;

    if (grievanceData.KPI_2 == 'Yes') {
        grievance = 1;

    } else {
        grievance = 0;
    }

    return 0;
}

module.exports = {
    serviceCoverageScore,
    adequacyScore,
    waterQualityScore,
    reliabilityScore,
    nrwScore,
    omScore,
    meteringRatio,
    grievanceAddressal,
}
