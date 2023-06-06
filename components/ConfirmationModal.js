import React from 'react';
import { Modal, View, Text, Button } from 'react-native';

const ConfirmationModal = ({ id, nom, prenom, tel, email, grade, specialite, villeActuelle, etablissement, villeDesiree, password, onConfirm }) => {
  return (
    <Modal visible={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Confirmation Modal</Text>
        <Text>ID: {id}</Text>
        <Text>Nom: {nom}</Text>
        <Text>Prénom: {prenom}</Text>
        <Text>Téléphone: {tel}</Text>
        <Text>Email: {email}</Text>
        <Text>Grade: {grade}</Text>
        <Text>Spécialité: {specialite}</Text>
        <Text>Ville actuelle: {villeActuelle}</Text>
        <Text>Établissement: {etablissement}</Text>
        <Text>Ville désirée: {villeDesiree}</Text>
        <Text>Mot de passe: {password}</Text>
        <Button title="Confirm" onPress={onConfirm} />
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
