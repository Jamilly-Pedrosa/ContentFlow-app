import { ScrollView, Pressable, Text } from 'react-native';

export interface FilterOption {
  label: string;
  value: string;
  count: number;
}

interface ContentFiltersProps {
  filters: FilterOption[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export default function ContentFilters({
  filters,
  activeFilter,
  setActiveFilter,
}: ContentFiltersProps) {

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-2 mb-2"
      contentContainerClassName="flex-row items-center gap-1 rounded-xl bg-[#FAFAFA] p-1"
    >
      {filters.map((filter) => (
        <Pressable
          key={filter.value}
          onPress={() => setActiveFilter(filter.value)}
          className={`flex-row items-center rounded-full px-2 py-1.5 ${
            activeFilter === filter.value
              ? 'bg-[#F0EDFF]'
              : 'bg-transparent'
          }`}
        >
          <Text className="font-popins text-small-text text-[#333333]">
            {filter.label}
          </Text>

          <Text className="font-popins text-small-text ml-1 text-[#888888]">
            ({filter.count})
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
