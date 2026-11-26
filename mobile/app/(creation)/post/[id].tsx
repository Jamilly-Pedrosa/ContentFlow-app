import PostForm from '../../../components/posts/PostForm';
import { useLocalSearchParams } from 'expo-router';

export default function EditPost() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <PostForm mode="edit" postId={id} />
    );
}