export interface InvestmentsResponse {
    statusCode: number;
    message: string;
    investments: Investment[];
}

export interface Investment {
    id?: number;
    name: string; // nazwa
    contract_signing_date: string; // data_podpisania_umowy (ISO string format, np. "2024-12-15")
    completion_deadline: string; // termin_zakonczenia (ISO string format, np. "2025-12-15")
    contract_annex: string; // zalacznik_umowy
    notes: string; // notatki
    construction_site_contact: string; // kontakt_na_placu_budowy
    responsible_person: string; // osoba_odpowiedzialna
    supervision_inspector: string; // inspektor_nadzoru
    journal_registration: string; // rejestracja_dziennika (ID lub numer rejestracyjny)
    work_start_notification: string; // powiadomienie_o_rozpoczeciu_prac (1 lub 0 jako tekst)
    construction_board: string; // tablica_budowy (1 lub 0 jako tekst)
    building_project_minor_changes: string; // zmiany_projektu_budowlanego
    execution_project: string; // projekt_wykonawczy
    string_design: string; // projekt_stringow
    medium_voltage_connection_scope: string; // zakres_przylacza_sredniego_napiecia
    acceptance_protocol: string; // protokol_odbioru
    osd_acceptance_documentation: string; // dokumentacja_odbioru_osd
    client_acceptance_documentation: string; // dokumentacja_odbioru_klienta
    power_plant_connection: string; // przylaczenie_elektrowni (1 lub 0 jako tekst)
    psp_notification: string; // powiadomienie_psp (1 lub 0 jako tekst)
    pinb_notification: string; // powiadomienie_pinb (1 lub 0 jako tekst)
    surveyor_stakeout: string; // wytyczenie_geodety
    surveyor_inventory: string; // inwentaryzacja_geodety
    fence_delivery: string; // dostawa_ogrodzenia
    fence_construction: string; // budowa_ogrodzenia
    site_security: string; // zabezpieczenie_placu_budowy
    structure_delivery: string; // dostawa_konstrukcji
    piling: string; // palenie
    structure_assembly: string; // montaz_konstrukcji
    module_delivery: string; // dostawa_modulow
    module_installation: string; // montaz_modulow
    assembly_materials: string; // materialy_montazowe
    ac_wiring_routes: string; // trasy_okablowania_ac
    dc_wiring_routes: string; // trasy_okablowania_dc
    medium_voltage_wiring_routes: string; // trasy_okablowania_sredniego_napiecia
    transformer_station: string; // stacja_transformatorowa
    telematics: string; // telemechanika
    cctv: string; // cctv
    equipotential_connections: string; // polaczenia_rownopotencjalowe
}
