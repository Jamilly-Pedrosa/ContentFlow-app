import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NotePencilIcon, LightbulbIcon, XIcon } from 'phosphor-react-native';
import { colors } from '../../theme/Colors';

type CreateDrawerProps = {
  visible: boolean;
  close: () => void;
};

export default function CreateDrawer({
  visible,
  close,
}: CreateDrawerProps) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={close} />

      <View style={styles.drawer}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={close}
            style={styles.closeButton}
            accessibilityRole="button"
            accessibilityLabel="Fechar"
          >
            <XIcon size={24} color={colors.gray[900]} />
          </Pressable>

          <Text className="font-poppins-medium text-large-text color-text-gray-800">
            O que você deseja criar?
          </Text>
        </View>

        {/* Ações */}
        <View style={styles.actions}>
          <Pressable style={styles.action}>
            <View style={styles.containerIcon}>
              <NotePencilIcon size={24} color={colors.gray[900]} />
            </View>

            <Text className="font-poppins-medium text-body-text color-text-gray-800">
              Post
            </Text>
          </Pressable>

          <Pressable style={styles.action}>
            <View style={styles.containerIcon}>
              <LightbulbIcon size={24} color={colors.gray[900]} />
            </View>

            <Text className="font-poppins-medium text-body-text color-text-gray-800">
              Ideia
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },

  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.30)',
  },

  drawer: {
    width: '100%',
    height: 215,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  header: {
    position: 'relative',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 14,
  },

  closeButton: {
    position: 'absolute',
    left: 16,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 16,
  },

  action: {
    alignItems: 'center',
  },

  containerIcon: {
    width: 70,
    height: 70,
    borderRadius: 24,
    backgroundColor: colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
});