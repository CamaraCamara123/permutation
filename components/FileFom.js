import React, { useState, useRef } from 'react';
import { View, Text, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Select from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import ConfirmationModal from './ConfirmationModal';

const FileForm = () => {
  const [_id, setId] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [villeActuelle, setVilleActuelle] = useState('');
  const [etablissement, setEtablissement] = useState('');
  const [villeDesiree, setVilleDesiree] = useState('');
  const [password, setPassword] = useState('');
  const toast = useRef(null);
  const navigation = useNavigation();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const resetForm = () => {
    setNom('');
    setPrenom('');
    setTel('');
    setEmail('');
    setGrade('');
    setEtablissement('');
    setSpecialite('');
    setVilleActuelle('');
    setVilleDesiree('');
    setPassword('');
  };

  // Tableau contenant les villes marocaines
  const cities = [
    'Agadir',
    'Es-Semara',
    'Sidi Bennour',
    'El Kelaa des Sraghna',
    'Al Hoceima',
    'Assilah',
    'Azemmour',
    'Azrou',
    'Beni Mellal',
    'Benslimane',
    'Berkane',
    'Berrechid',
    'Boujdour',
    'Boulemane',
    'Casablanca',
    'Chefchaouen',
    'Dakhla',
    'El Hajeb',
    'El Jadida',
    'Errachidia',
    'Essaouira',
    'Fès',
    'Figuig',
    'Guelmim',
    'Ifrane',
    'Kénitra',
    'Khemisset',
    'Khenifra',
    'Khouribga',
    'Laâyoune',
    'Larache',
    'Marrakech',
    'Meknès',
    'Mohammédia',
    'Nador',
    'Ouarzazate',
    'Ouazzane',
    'Oujda',
    'Rabat',
    'Safi',
    'Salé',
    'Sefrou',
    'Settat',
    'Sidi Kacem',
    'Tan-Tan',
    'Tanger',
    'Taourirt',
    'Taroudant',
    'Taza',
    'Témara',
    'Tétouan',
    'Tiznit',
  ].sort();

  const citiesOptions = cities.map((city) => ({ value: city, label: city }));

  // Tableau contenant les spécialités
  const specialities = [
    'Physique',
    'Chimie',
    'Biologie',
    'Informatique',
    'Mathématiques',
    'Géographie',
    'Histoire',
    'Langues',
    'Philosophie',
    'Économie',
    'Gestion',
    'Médecine',
    'Droit',
    'Architecture',
  ].sort();

  const specialitiesOptions = specialities.map((speciality) => ({
    value: speciality,
    label: speciality,
  }));

  const handleSubmit = (values) => {
    // You can perform form validation here before submitting the data
    setShowConfirmation(true);
    setId(values._id);
    setNom(values.nom);
    setPrenom(values.prenom);
    setTel(values.tel);
    setEmail(values.email);
    setGrade(values.grade);
    setSpecialite(values.specialite);
    setVilleActuelle(values.villeActuelle);
    setEtablissement(values.etablissement);
    setVilleDesiree(values.villeDesiree);
    setPassword(values.password);
  };

  const handleConfirmation = () => {
    // Handle form submission and display success message
    // You can make an API call or perform any other necessary actions here
    // For demonstration purposes, we're just resetting the form and displaying an alert
    resetForm();
    setShowConfirmation(false);
    Alert.alert('Success', 'Form submitted successfully!', [
      { text: 'OK', onPress: handleLogout },
    ]);
  };

  const validateEmail = (email) => {
    // Basic email validation
    const emailRegex = /\S+@\S+\.\S+/;
    const isValid = emailRegex.test(email);
    setIsValidEmail(isValid);
    return isValid;
  };

  return (
    <View>
      <Input
        label="ID"
        value={_id}
        onChangeText={setId}
      />
      <Input
        label="Nom"
        value={nom}
        onChangeText={setNom}
      />
      <Input
        label="Prénom"
        value={prenom}
        onChangeText={setPrenom}
      />
      <Input
        label="Téléphone"
        value={tel}
        onChangeText={setTel}
      />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        errorMessage={isValidEmail ? null : 'Veuillez saisir un email valide'}
      />
      <Input
        label="Grade"
        value={grade}
        onChangeText={setGrade}
      />
      <Select
        label="Spécialité"
        value={specialite}
        onValueChange={setSpecialite}
        items={specialitiesOptions}
      />
      <Select
        label="Ville actuelle"
        value={villeActuelle}
        onValueChange={setVilleActuelle}
        items={citiesOptions}
      />
      <Input
        label="Établissement"
        value={etablissement}
        onChangeText={setEtablissement}
      />
      <Select
        label="Ville désirée"
        value={villeDesiree}
        onValueChange={setVilleDesiree}
        items={citiesOptions}
      />
      <Input
        label="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default FileForm;
