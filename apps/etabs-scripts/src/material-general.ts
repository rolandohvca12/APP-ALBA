import {
    connectToEtabs,
    eMatType,
    eUnits,
} from "@app-alba/etabs-bridge-client";

const etabs = await connectToEtabs();

try {
    // await etabs.sapModel.initializeNewModel();
    // await etabs.file.newBlank();
    await etabs.sapModel.setPresentUnits(eUnits.Ton_m_C);

    const material = "MATERIAL_GENERAL";

    // Material general sin código de diseño asociado.
    await etabs.propMaterial.setMaterial(
        material,
        eMatType.NoDesign,
    );

    // Propiedades mecánicas.
    await etabs.propMaterial.setMPIsotropic(
        material,
        25_000_000, // Módulo E en kN/m²
        0.20,       // Coeficiente de Poisson
        1.0e-5,     // Expansión térmica 1/°C
    );

    // MyOption = 1: peso por unidad de volumen.
    await etabs.propMaterial.setWeightAndMass(
        material,
        1,
        24, // kN/m³
    );

    const seccion = "SECCION_GENERAL";

    const k = 1 / 1.2;
    const A = 2.56;

    await etabs.propFrame.setGeneral(
        seccion,
        material,
        3,
        0.25,
        A,
        A * k,
        A * k,
        1e-6,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
    )
    await etabs.view.refreshView(0, true);
    // await etabs.file.save("C:\\Temp\\modelo-material-general.edb");

} finally {
    etabs.close();
}