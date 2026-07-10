const serviceCoverageScore = (serviceCoverageData) => {
    if (!serviceCoverageData) return 0;

    const kpi2 = Number(serviceCoverageData.KPI_2);
    const kpi3 = Number(serviceCoverageData.KPI_3);

    if (!Number.isFinite(kpi2) || !Number.isFinite(kpi3) || kpi2 < 1 || kpi3 < 1) {
        return 0;
    }

    const c = (kpi2 / kpi3) * 100;

    if (c >= 100) return 1.0;
    if (c > 60) return (c - 60) / 40;

    return 0;
};

const adequacyScore = (adequacyData) => {
    if (!adequacyData) return 0;

    const production = Number(adequacyData.KPI_2);
    const population = Number(adequacyData.KPI_3);

    if (
        !Number.isFinite(production) ||
        !Number.isFinite(population) ||
        production < 1 ||
        population < 1
    ) {
        return 0;
    }

    const LPCD = (production * 1000) / (population * 30);

    if (adequacyData.KPI_1 === "Pumped") {
        if (LPCD >= 100) return 1.0;
        if (LPCD >= 45) return (LPCD - 45) / 55;
        return 0;
    }

    if (adequacyData.KPI_1 === "Gravity Flow") {
        if (LPCD >= 120) return 1.0;
        if (LPCD >= 45) return (LPCD - 45) / 75;
        return 0;
    }

    return 0;
};

const waterQualityScore = (waterQualityData) => {
    if (!waterQualityData) return 0;

    let waterQuality = 0;

    if (waterQualityData.KPI_2 === "Yes") waterQuality += 0.20;
    if (waterQualityData.KPI_3 === "Yes") waterQuality += 0.30;
    if (waterQualityData.KPI_4 === "Yes") waterQuality += 0.30;
    if (waterQualityData.KPI_5 === "Yes") waterQuality += 0.20;

    return waterQuality;
};

const reliabilityScore = (reliabilityData) => {
    if (!reliabilityData) return 0;

    const hours = Number(reliabilityData.KPI_2);

    if (!Number.isFinite(hours) || hours < 1) {
        return 0;
    }

    // Reliability in percentage
    const rs = (hours / 24) * 100;

    if (rs >= 100) return 1.0;
    if (rs > 12.5) return (rs - 12.5) / 87.5;
    if (rs === 12.5) return 0.5;

    return 0;
};

const nrwScore = (nrwData) => {
    if (!nrwData) return 0;

    if (nrwData.KPI_5 === "Yes") {
        return 1;
    }
    if (nrwData.KPI_5 === "No" && nrwData.KPI_4 === "Yes") {
        return 0.5
    }
    if (nrwData.KPI_5 === "No" && nrwData.KPI_4 === "No" && nrwData.KPI_3 === "Yes") {
        return 0.3
    }
    if (nrwData.KPI_5 === "No" && nrwData.KPI_4 === "No" && nrwData.KPI_3 === "No" && nrwData.KPI_2 === "Yes") {
        return 0.2
    }
    if (nrwData.KPI_5 === "No" && nrwData.KPI_4 === "No" && nrwData.KPI_3 === "No" && nrwData.KPI_2 === "No" && nrwData.KPI_1 === "Yes") {
        return 0.1
    }
    if (nrwData.KPI_5 === "No" && nrwData.KPI_4 === "No" && nrwData.KPI_3 === "No" && nrwData.KPI_2 === "No" && nrwData.KPI_1 === "No") {
        return 0
    }

    return 0;
};

const omScore = (omData) => {
    if (!omData) return 0;

    const operatingCost = Number(omData.KPI_2);
    const revenue = Number(omData.KPI_3);

    if (
        !Number.isFinite(operatingCost) ||
        !Number.isFinite(revenue) ||
        operatingCost < 1 ||
        revenue < 1
    ) {
        return 0;
    }

    const or = operatingCost / revenue;

    if (or <= 0.7) return 1.0;
    if (or < 1.2) return (1.2 - or) / 0.5;

    return 0;
};

const meteringRatio = (meteringData) => {
    if (!meteringData) return 0;

    const meteredConnections = Number(meteringData.KPI_1);
    const totalConnections = Number(meteringData.KPI_2);

    if (
        !Number.isFinite(meteredConnections) ||
        !Number.isFinite(totalConnections) ||
        meteredConnections < 1 ||
        totalConnections < 1
    ) {
        return 0;
    }

    const mr = (meteredConnections / totalConnections) * 100;

    if (mr >= 100) return 1.0;
    if (mr > 60) return (mr - 60) / 40;

    return 0;
};

const grievanceAddressal = (grievanceData) => {
    if (!grievanceData) return 0;

    return grievanceData.KPI_2 === "Yes" ? 1 : 0;
};

module.exports = {
    serviceCoverageScore,
    adequacyScore,
    waterQualityScore,
    reliabilityScore,
    nrwScore,
    omScore,
    meteringRatio,
    grievanceAddressal,
};