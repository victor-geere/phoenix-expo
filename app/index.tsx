import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BASE_URL } from '../common/config';
import { neomorphicShadow, theme } from '../constants/theme';

interface Member {
  id: string;
  mMember: string;
  gGroup: string;
  mSubsType: string;
  mReasonRes: string;
  mCatch: string;
  mVip: string;
}

const IndexScreen: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [newMember, setNewMember] = useState({
    mMember: '',
    gGroup: '',
    mSubsType: 'S',
    mReasonRes: '',
    mCatch: '',
    mVip: 'Y',
  });

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/members`);
      const data = await response.json();
      setMembers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching members:', error);
      Alert.alert('Error', 'Failed to fetch members');
    } finally {
      setLoading(false);
    }
  };

  const createMember = async () => {
    try {
      const response = await fetch(`${BASE_URL}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMember),
      });
      if (response.ok) {
        Alert.alert('Success', 'Member created');
        fetchMembers(); // Refresh list
      } else {
        Alert.alert('Error', 'Failed to create member');
      }
    } catch (error) {
      console.error('Error creating member:', error);
      Alert.alert('Error', 'Failed to create member');
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const renderMember = ({ item }: { item: Member }) => (
    <View style={styles.item}>
      <Text>Member: {item.mMember}</Text>
      <Text>Group: {item.gGroup}</Text>
      <Text>Subs Type: {item.mSubsType}</Text>
      <Text>Reason Res: {item.mReasonRes}</Text>
      <Text>Catch: {item.mCatch}</Text>
      <Text>VIP: {item.mVip}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Members</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={members}
          renderItem={renderMember}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text>No members found</Text>}
        />
      )}
      <View style={styles.form}>
        <Text>Create New Member</Text>
        <TextInput
          style={styles.input}
          placeholder="mMember"
          value={newMember.mMember}
          onChangeText={(text) => setNewMember({ ...newMember, mMember: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="gGroup"
          value={newMember.gGroup}
          onChangeText={(text) => setNewMember({ ...newMember, gGroup: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="mReasonRes"
          value={newMember.mReasonRes}
          onChangeText={(text) => setNewMember({ ...newMember, mReasonRes: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="mCatch"
          value={newMember.mCatch}
          onChangeText={(text) => setNewMember({ ...newMember, mCatch: text })}
        />
        <Button  title="Create Member" onPress={createMember} />
      </View>
      <Button title="Refresh" onPress={fetchMembers} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.background,
    borderRadius: 12,
    padding: 20,
    ...neomorphicShadow(8),
  },
  container: {
    flex: 1,
    padding: 16,
    marginTop: 20,
    backgroundColor: '#fff',
    maxWidth: 900,
    minWidth: 600,
    alignSelf: 'center',
    ...neomorphicShadow(8),
 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    padding: 16,
    marginBottom: 5,
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
    borderRadius: 4,
  },
  button: {


  }
});

export default IndexScreen;