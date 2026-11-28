import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Funnel } from 'phosphor-react-native';

export type PeriodOption =
  | 'Últimos 7 dias'
  | 'Últimos 30 dias'
  | 'Últimos 3 meses'
  | 'Últimos 6 meses'
  | 'Este ano';

interface PeriodFilterProps {
  selectedPeriod: PeriodOption;
  onChange: (period: PeriodOption) => void;
}

const periods: PeriodOption[] = [
  'Últimos 7 dias',
  'Últimos 30 dias',
  'Últimos 3 meses',
  'Últimos 6 meses',
  'Este ano',
];

export default function PeriodFilter({
  selectedPeriod,
  onChange,
}: PeriodFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (period: PeriodOption) => {
    onChange(period);
    setIsOpen(false);
  };

  return (
    <View style={{ position: 'relative', zIndex: 10 }}>
      {isOpen ? (
        <View
          style={{
            width: 165,
            backgroundColor: '#F0EEFD',
            borderRadius: 24,
            paddingVertical: 8,
            borderWidth: 0.2,
            borderColor: '#C5C6CC',
          }}
        >
          <Pressable
            onPress={() => setIsOpen(false)}
            style={{
              height: 35,
              paddingLeft: 12,
              paddingRight: 8,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text className="font-poppins-regular text-[14px]"
              style={{ color: '#6554EE' }}
            >
              {selectedPeriod}
            </Text>

            <Funnel size={18} color="#6554EE" />
          </Pressable>

          {periods
            .filter((period) => period !== selectedPeriod)
            .map((period) => (
              <Pressable
                key={period}
                onPress={() => handleSelect(period)}
                style={{
                  height: 39,
                  justifyContent: 'center',
                  paddingHorizontal: 12,
                }}
              >
                <Text
                  className="font-poppins-regular text-[14px]"
                  style={{ color: '#777777' }}
                >
                  {period}
                </Text>
              </Pressable>
            ))}
        </View>
      ) : (
        <Pressable
          onPress={() => setIsOpen(true)}
          style={{
            width: 165,
            height: 38,
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 12,
            paddingRight: 8,
            backgroundColor: '#F0EEFD',
            borderWidth: 0.2,
            borderColor: '#C5C6CC',
            borderRadius: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            className="font-poppins-regular text-[14px]"
            style={{ color: '#6554EE' }}
          >
            {selectedPeriod}
          </Text>

          <Funnel size={18} color="#6554EE" />
        </Pressable>
      )}
    </View>
  );
}
