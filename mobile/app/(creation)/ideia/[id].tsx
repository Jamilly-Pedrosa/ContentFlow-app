import { useLocalSearchParams } from 'expo-router';
import IdeiaForm from '../../../components/ideias/IdeiaForm';

export default function EditarIdeia() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <IdeiaForm mode="edit" ideiaId={id} />;
}