import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import SPACING from "../../../config/SPACING";
import colors from "../../../config/colors";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import SearchField from "../../components/searchField";
import Categories from "../../components/categories";
import coffees from "../../../config/coffees";

const avatar = require("../../../assets/avatar.jpg");

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const goToCoffeeDetail = (coffee) => {
    navigation.navigate("CoffeeDetail", { coffee });
  };
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCoffees = coffees.filter((coffee) => {
    // Category filter
    const matchesCategory =
      activeCategoryId === null ||
      activeCategoryId === 5 ||
      coffee.categoryId === activeCategoryId;

    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      coffee.name.toLowerCase().includes(searchQuery.toLowerCase());

    // Both filters must pass
    return matchesCategory && matchesSearch;
  });

  const addToCart = (coffee) => {};

  return (
    <SafeAreaView style={{ backgroundColor: colors.dark, flex:1 }}>
      <ScrollView
        style={{
          padding: SPACING,
          paddingTop: SPACING * 3.5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: SPACING,
              overflow: "hidden",
              width: SPACING * 4,
              height: SPACING * 4,
            }}
          >
            <BlurView
              style={{
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="menu"
                size={SPACING * 2.5}
                style={{
                  textAlign: "center",
                }}
                color={colors["white-smoke"]}
              />
            </BlurView>
          </TouchableOpacity>
          <View
            style={{
              width: SPACING * 4,
              height: SPACING * 4,
              overflow: "hidden",
              borderRadius: SPACING,
            }}
          >
            <BlurView style={{ height: "100%", padding: SPACING / 2 }}>
              <Image
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: SPACING,
                }}
                source={avatar}
              />
            </BlurView>
          </View>
        </View>
        <View style={{ width: "80%", marginVertical: SPACING * 3 }}>
          <Text
            style={{
              color: colors.white,
              fontSize: SPACING * 3.5,
              fontWeight: "600",
            }}
          >
            Find the best coffe for you
          </Text>
        </View>
        <SearchField onSearchChange={setSearchQuery} />
        <Categories onChange={(id) => setActiveCategoryId(id)} />
        <View height={SPACING * 1} />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {filteredCoffees.map((coffee) => (
            <View
              key={coffee.id}
              style={{
                width: width / 2 - SPACING * 2,
                marginBottom: SPACING,
                borderRadius: SPACING * 2,
                overflow: "hidden",
              }}
            >
              <BlurView
                tint="dark"
                intensity={95}
                style={{
                  padding: SPACING,
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 150,
                    width: "100%",
                  }}
                  key={coffee.id}
                  onPress={() => goToCoffeeDetail(coffee)}
                >
                  <Image
                    source={coffee.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: SPACING * 2,
                    }}
                  />
                  <View
                    style={{
                      position: "absolute",
                      right: 0,
                      borderBottomLeftRadius: SPACING * 3,
                      borderTopEndRadius: SPACING * 2,
                      overflow: "hidden",
                    }}
                  >
                    <BlurView
                      tint="dark"
                      intensity={70}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: SPACING - 2,
                      }}
                    >
                      <Ionicons
                        style={{
                          marginLeft: SPACING / 2,
                        }}
                        name="star"
                        size={SPACING * 1.7}
                        color={colors.primary}
                      />
                      <Text
                        style={{
                          color: colors.white,
                          marginLeft: SPACING / 2,
                        }}
                      >
                        {coffee.rating}
                      </Text>
                    </BlurView>
                  </View>
                </TouchableOpacity>
                <Text
                  numberOfLines={2}
                  style={{
                    color: colors.white,
                    fontWeight: "600",
                    fontSize: SPACING * 1.65,
                    marginTop: SPACING,
                    marginBottom: SPACING / 2,
                  }}
                >
                  {coffee.name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ color: colors.secondary, fontSize: SPACING * 1.2 }}
                >
                  {coffee.included}
                </Text>
                <View
                  style={{
                    marginVertical: SPACING / 2,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        color: colors.primary,
                        marginRight: SPACING / 2,
                      }}
                    >
                      $
                    </Text>
                    <Text
                      style={{
                        color: colors.white,
                        fontSize: SPACING * 1.6,
                      }}
                    >
                      {coffee.price}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.primary,
                      padding: SPACING / 2,
                      borderRadius: SPACING,
                      alignItems: "center",
                    }}
                    onPress={() => addToCart(coffee)}
                  >
                    <Ionicons
                      name="add"
                      size={SPACING * 2}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                </View>
              </BlurView>
            </View>
          ))}
        </View>
        <View height={SPACING * 12} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
