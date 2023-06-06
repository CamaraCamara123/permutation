import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Remplacer le package d'icon par 'react-native-vector-icons'

import ProfesseursContext from './ProfesseursContext';
import ProgressBarWithLabel from './ProgressBar';

const FilterData = () => {
    const [speciality, setSpeciality] = useState('');
    const [currentFacCity, setCurrentFacCity] = useState('');
    const [desiredCity, setDesiredCity] = useState('');
    const dataP = useContext(ProfesseursContext);

    // Tableau contenant les villes marocaines
    const cities = [
        'Agadir', 'Es-Semara', 'Al Hoceima', 'El Kelaa des Sraghna', 'Assilah', 'Azemmour', 'Azrou', 'Beni Mellal',
        'Benslimane', 'Berkane', 'Berrechid', 'Boujdour', 'Boulemane', 'Casablanca', 'Chefchaouen', 'Dakhla',
        'El Hajeb', 'El Jadida', 'Errachidia', 'Essaouira', 'Fès', 'Figuig', 'Guelmim', 'Ifrane', 'Kénitra',
        'Khemisset', 'Khenifra', 'Khouribga', 'Laâyoune', 'Larache', 'Marrakech', 'Meknès', 'Mohammédia', 'Nador',
        'Ouarzazate', 'Ouazzane', 'Oujda', 'Rabat', 'Safi', 'Salé', 'Sefrou', 'Settat', 'Sidi Kacem', 'Tan-Tan',
        'Sidi Bennour', 'Tanger', 'Taourirt', 'Taroudant', 'Taza', 'Témara', 'Tétouan', 'Tiznit'
    ].sort();

    // Tableau contenant les spécialités
    const specialities = [
        'Physique', 'Amazighe', 'Espagnol', 'Informatique', 'Médecine', 'Linguistique arabe', 'Droit', 'Chimie',
        'Mathématiques', 'Génie Civil', 'Génie Électrique', 'Génie Mécanique', 'Génie Chimique', 'Sciences Économiques',
        'Sciences Politiques', 'Langues et Littératures', 'Chimie minérale', 'Chimie Physique', 'Histoire',
        'Didactique des SVT', 'Science de Gestion', 'Logistique', 'Électronique, Instrumentation et Énergétique',
        'Géographie', 'Psychologie', 'Sociologie', 'Philosophie', 'Anthropologie', 'Archéologie',
        'Sciences de l\'environnement', 'Ingénierie aérospatiale', 'Gestion des affaires internationales',
        'Sciences de la communication', 'Musique', 'Théâtre', 'Arts visuels', 'Études religieuses',
        'Études de genre', 'Science de la nutrition', 'Éducation', 'Anglais', 'Physiologie végétale',
        'Relations publiques', 'Traduction et interprétation', 'Criminologie', 'Études autochtones',
        'Études de développement', 'Design graphique', 'Design industriel', 'Journalisme',
        'Bibliothéconomie et sciences de l\'information', 'Travail social', 'Biologie',
        'Biologie et biotechnologie agroalimentaire', 'Biotechnologie agroalimentaire', 'Finance',
        'Géomatique et Hydrologie', 'Génie industriel et maintenance', 'Télécommunication', 'Droit publique',
        'Géologie', 'Biochimie', 'Droit français', 'Statistiques et probabilités', 'Physique médicale',
        'Patrimoine', 'Physiologie animale', 'Géophysique', 'Électronique, électrotechnique et automatique',
        'Génie de procédés', 'Droit privé'
    ].sort();

    const filteredData = dataP && dataP.filter((item) => {
        return (
            item['specialite'].toLowerCase().includes(speciality.toLowerCase()) &&
            item['villeFaculteActuelle'].toLowerCase().includes(currentFacCity.toLowerCase()) &&
            item['villeDesiree'].toLowerCase().includes(desiredCity.toLowerCase())
        );
    });

    return Object.keys(dataP).length > 0 ? (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Rechercher</Text>
            <View style={styles.card}>
                <View style={styles.cardBody}>
                    <View style={styles.form}>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Spécialité:</Text>
                            <Picker
                                style={styles.picker}
                                selectedValue={speciality}
                                onValueChange={(value) => setSpeciality(value)}
                            >
                                <Picker.Item label="Toutes les spécialités" value="" />
                                {specialities.map((speciality) => (
                                    <Picker.Item label={speciality} value={speciality} key={speciality} />
                                ))}
                            </Picker>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Ville Actuelle:</Text>
                            <Picker
                                style={styles.picker}
                                selectedValue={currentFacCity}
                                onValueChange={(value) => setCurrentFacCity(value)}
                            >
                                <Picker.Item label="Toutes les villes" value="" />
                                {cities.map((city) => (
                                    <Picker.Item label={city} value={city} key={city} />
                                ))}
                            </Picker>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Ville Désirée:</Text>
                            <Picker
                                style={styles.picker}
                                selectedValue={desiredCity}
                                onValueChange={(value) => setDesiredCity(value)}
                            >
                                <Picker.Item label="Toutes les villes" value="" />
                                {cities.map((city) => (
                                    <Picker.Item label={city} value={city} key={city} />
                                ))}
                            </Picker>
                        </View>
                        <Button
                            title="Réinitialiser"
                            icon={<Icon name="refresh" size={20} style={styles.buttonIcon} />} // Utilisation de l'icône "refresh" de MaterialIcons
                            onPress={() => {
                                setSpeciality('');
                                setCurrentFacCity('');
                                setDesiredCity('');
                            }}
                            buttonStyle={styles.button}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.resultContainer}>
                <Text style={styles.resultText}>
                    {filteredData.length} {filteredData.length === 1 ? 'résultat' : 'résultats'}
                </Text>
                {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                        <View key={item.id} style={styles.resultCard}>
                            <Text style={styles.resultCardText}>{item.nom}</Text>
                            <Text style={styles.resultCardText}>{item.specialite}</Text>
                            <Text style={styles.resultCardText}>{item.villeFaculteActuelle}</Text>
                            <Text style={styles.resultCardText}>{item.villeDesiree}</Text>
                            <ProgressBarWithLabel progress={item.pourcentage} />
                        </View>
                    ))
                ) : (
                    <Text style={styles.noResultsText}>Aucun résultat trouvé</Text>
                )}
            </View>
        </ScrollView>
    ) : (
        <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Chargement des données...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        marginBottom: 16,
    },
    cardBody: {
        padding: 16,
    },
    form: {
        marginBottom: 16,
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    picker: {
        backgroundColor: '#f2f2f2',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    button: {
        backgroundColor: '#ff5733',
        borderRadius: 4,
        paddingVertical: 12,
    },
    buttonIcon: {
        marginRight: 8,
    },
    resultContainer: {
        flex: 1,
    },
    resultText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    resultCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        padding: 16,
        marginBottom: 16,
    },
    resultCardText: {
        fontSize: 14,
        marginBottom: 8,
    },
    noResultsText: {
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 32,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default FilterData;