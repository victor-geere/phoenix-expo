import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BASE_URL } from '../common/config';

interface Benefit {
  id: string;
  mMember: string;
  bnDtEnt: number;
  bnId: string;
  bnDesc: string;
  bnDeps: number;
  bnPct: number;
}

const BenefitsScreen: React.FC = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(false);
  const [newBenefit, setNewBenefit] = useState({
    mMember: '',
    bnDtEnt: 1,
    bnId: '',
    bnDesc: '',
    bnDeps: 1,
    bnPct: 1,
  });

  const fetchBenefits = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/benefits`);
      const data = await response.json();
      setBenefits(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching benefits:', error);
      Alert.alert('Error', 'Failed to fetch benefits');
    } finally {
      setLoading(false);
    }
  };

  const createBenefit = async () => {
    try {
      const response = await fetch(`${BASE_URL}/benefits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBenefit),
      });
      if (response.ok) {
        Alert.alert('Success', 'Benefit created');
        fetchBenefits(); // Refresh list
        setNewBenefit({
          mMember: '',
          bnDtEnt: 1,
          bnId: '',
          bnDesc: '',
          bnDeps: 1,
          bnPct: 1,
        });
      } else {
        Alert.alert('Error', 'Failed to create benefit');
      }
    } catch (error) {
      console.error('Error creating benefit:', error);
      Alert.alert('Error', 'Failed to create benefit');
    }
  };

  useEffect(() => {
    fetchBenefits();
  }, []);

  const renderBenefit = ({ item }: { item: Benefit }) => (
    <View style={styles.item}>
      <Text>ID: {item.id}</Text>
      <Text>Member: {item.mMember}</Text>
      <Text>Date Entered: {item.bnDtEnt}</Text>
      <Text>Benefit ID: {item.bnId}</Text>
      <Text>Description: {item.bnDesc}</Text>
      <Text>Dependents: {item.bnDeps}</Text>
      <Text>Percentage: {item.bnPct}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Medware API Interface - Benefits</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={benefits}
          renderItem={renderBenefit}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text>No benefits found</Text>}
        />
      )}
      <View style={styles.form}>
        <Text>Create New Benefit</Text>
        <TextInput
          style={styles.input}
          placeholder="mMember"
          value={newBenefit.mMember}
          onChangeText={(text) => setNewBenefit({ ...newBenefit, mMember: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="bnId"
          value={newBenefit.bnId}
          onChangeText={(text) => setNewBenefit({ ...newBenefit, bnId: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="bnDesc"
          value={newBenefit.bnDesc}
          onChangeText={(text) => setNewBenefit({ ...newBenefit, bnDesc: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="bnDtEnt"
          value={newBenefit.bnDtEnt.toString()}
          keyboardType="numeric"
          onChangeText={(text) => setNewBenefit({ ...newBenefit, bnDtEnt: parseInt(text) || 1 })}
        />
        <TextInput
          style={styles.input}
          placeholder="bnDeps"
          value={newBenefit.bnDeps.toString()}
          keyboardType="numeric"
          onChangeText={(text) => setNewBenefit({ ...newBenefit, bnDeps: parseInt(text) || 1 })}
        />
        <TextInput
          style={styles.input}
          placeholder="bnPct"
          value={newBenefit.bnPct.toString()}
          keyboardType="numeric"
          onChangeText={(text) => setNewBenefit({ ...newBenefit, bnPct: parseInt(text) || 1 })}
        />
        <Button title="Create Benefit" onPress={createBenefit} />
      </View>
      <Button title="Refresh" onPress={fetchBenefits} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  form: {
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
  },
});

export default BenefitsScreen;
