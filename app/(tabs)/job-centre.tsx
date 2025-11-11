// src/app/(tabs)/JobCenterScreen.tsx
import BrowseCategories from '@/components/jobCenter/browseCategories';
import RemoteJobs from '@/components/jobCenter/remoteJobs';
import SearchBar from '@/components/jobCenter/searchBar';
import SectionHeader from '@/components/jobCenter/sectionHeader';
import TopCompanies from '@/components/jobCenter/topCompanies';
import { BRAND, BRAND_BG, CARD_BG, TEXT_MUTED } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function JobCenterScreen() {
  const handleCategory = (id: string) => {
    console.log('Category pressed:', id);
  };

  return (
    <SafeAreaView style={styles.area}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Explore Jobs</Text>

        <SearchBar />

        <Text style={styles.section}>Browse by category</Text>
        <BrowseCategories onPress={handleCategory} />

        <SectionHeader title="Top Company" onPress={() => {}} />
        <TopCompanies />

        <SectionHeader title="Remote Jobs" onPress={() => {}} />
        <RemoteJobs />

        <SectionHeader title="Recommendation jobs" />
        <View style={styles.recommendTile}>
          <View style={styles.recommendRow}>
            <View style={{flexDirection:'row'}}>
              <View style={styles.rowElement1}>
                <Image source={require('./../../assets/images/netflix.png')}
                style={styles.logo}
                />
              </View>
              <View style={styles.rowElement2}>
                <Text style={styles.sub}>Netflix</Text>
                <Text style={styles.jobDescription}>Game Developer</Text>
                <Text style={styles.sub}>$1000-$1500/Month</Text>
              </View>
            </View>
            <Ionicons name="bookmark-outline" size={24} color={BRAND} />
          </View>
          <View style={styles.typeRow}>
            <View style={styles.type}>
              <Text>Fulltime</Text>
            </View>
            <View style={styles.type}>
              <Text>Remote</Text>
            </View>
            <View style={styles.type}>
              <Text>2 days ago</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Text>Apply now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: { flex: 1, backgroundColor: BRAND_BG, paddingHorizontal: 20, paddingBottom:-33 },
  scroll: { flexGrow: 1,},
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', paddingBottom: 6, marginTop: 6 },
  section: { fontSize: 18, fontWeight: '700', marginTop: 12, marginBottom: 8 },
  recommendTile:{
    flex:1,
    backgroundColor:'white',
    minHeight:200,
    borderRadius:20,
    padding:15
  },
  recommendRow:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  rowElement1:{
    padding:5,
    borderRadius:10,
    backgroundColor:CARD_BG,
    height:50,
    width:50,
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center'
  },
  rowElement2:{
    flexDirection:'column',
    paddingHorizontal:10
  },
  logo:{
    maxHeight:30,
    maxWidth:30
  },
  jobDescription:{
    paddingTop:10,
    fontWeight:'bold',
    fontSize:18,
    paddingBottom:5
  },
  sub:{
    color:TEXT_MUTED,
    fontWeight:'bold'
  },
  typeRow:{
    flexDirection:'row'
  },
  type:{
    padding:7,
    borderRadius:5,
    backgroundColor:'#f0ebebff',
    marginRight:10,
    marginVertical:20
  }
});
