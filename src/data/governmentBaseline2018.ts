/**
 * Government of India / NDDTC-AIIMS
 * "Magnitude of Substance Use in India" (February 2019)
 * Ministry of Social Justice and Empowerment, Government of India
 * National Drug Dependence Treatment Centre (NDDTC), AIIMS, New Delhi
 *
 * Survey: National Survey on Extent and Pattern of Substance Use in India
 * Survey period: December 2017 – October 2018
 * Population estimates based on: 2018 population
 *
 * IMPORTANT:
 * - Label: "Government of India / NDDTC-AIIMS National Survey baseline (2018)"
 * - NEVER present as 2025 data.
 * - null = "undetectable" or "not reported" in source.
 * - Do NOT fabricate district/city values from state percentages.
 *
 * State data source: Annexure 1, pages 65–72 of the report.
 */

import type { GovernmentBaselineDataset } from '../types/governmentBaseline'

export const governmentBaseline2018: GovernmentBaselineDataset = {
  sourceId: 'nddtc-aiims-mosje-2019',
  sourceOrganization:
    'Ministry of Social Justice and Empowerment (MoSJE), Government of India — National Drug Dependence Treatment Centre (NDDTC), AIIMS, New Delhi',
  report: 'Magnitude of Substance Use in India',
  publicationYear: 2019,
  surveyPeriod: 'December 2017 – October 2018',
  estimateYear: 2018,
  populationAge: '10–75 years',
  geography: 'India (all 36 States and Union Territories)',
  citationBadge: 'MoSJE / NDDTC-AIIMS · Survey 2017–2018 · Estimates 2018',

  definitions: {
    currentUse:
      'Use of the substance even once within the preceding 12 months.',
    dependence:
      'Current use of the substance along with WHO ASSIST score greater than 26.',
    harmfulUse:
      'Current use plus WHO ASSIST score between 4 and 26 (for alcohol, between 11 and 26) and experiencing a harmful consequence of substance use within the preceding 3 months.',
    quantumOfWork:
      'Combination of harmful use and dependence. Represents the proportion of the population requiring professional help/treatment.',
    oneCreore: '10 million.',
    oneLakh: '0.1 million.',
    opioids:
      'Opium including doda/phukki/poppy husk; heroin including brown sugar/smack; pharmaceutical opioids.',
    cannabis:
      'Bhang plus ganja/marijuana and charas/hashish unless otherwise specified.',
    sedatives:
      'Only non-medical/non-prescription use is included.',
  },

  // ─────────────────────────────────────────────────────────────
  // SUBSTANCES
  // ─────────────────────────────────────────────────────────────
  substances: [
    // ── ALCOHOL ──────────────────────────────────────────────
    {
      substance: 'alcohol',
      label: 'Alcohol',
      definition:
        'Includes all forms of alcohol. Country liquor / IMFL / spirits.',
      india: {
        currentUsePct: 14.6,
        dependencePct: 2.7,
        quantumOfWorkPct: 5.2,
        estimatedCurrentUsers: '16 crore',
        estimatedDependent: '2.9 crore',
        estimatedProblemUsers: 'More than 5.7 crore',
        notes: [
          'Approximately 19% of current alcohol users consume alcohol in a dependent pattern.',
          'Male current alcohol use = 27.3%; Female = 1.6%.',
          'Children (10–17) = 1.3%; Adults (>18) = 17.1%.',
          'Approximately 95% of alcohol users are male.',
          'Approximately 74% of alcohol users are aged 18–49 years.',
          'Country liquor/desi sharab ≈ 30%; Spirits/IMFL ≈ 30%.',
          '1 in 38 people with alcohol dependence received any treatment.',
          '1 in 180 people with alcohol dependence received inpatient treatment.',
        ],
      },
      states: [
        { stateCode: '01', state: 'Andhra Pradesh', currentUsePct: 26.2, dependencePct: 5.8, quantumOfWorkPct: 11.6 },
        { stateCode: '02', state: 'Arunachal Pradesh', currentUsePct: 37.7, dependencePct: 5.1, quantumOfWorkPct: 8.5 },
        { stateCode: '03', state: 'Assam', currentUsePct: 17.2, dependencePct: 2.1, quantumOfWorkPct: 5.7 },
        { stateCode: '04', state: 'Bihar', currentUsePct: 0.6, dependencePct: 0.1, quantumOfWorkPct: 0.2 },
        { stateCode: '05', state: 'Uttarakhand', currentUsePct: 18.8, dependencePct: 1.6, quantumOfWorkPct: 4.2 },
        { stateCode: '06', state: 'Goa', currentUsePct: 27.5, dependencePct: 5.1, quantumOfWorkPct: 10.6 },
        { stateCode: '07', state: 'Gujarat', currentUsePct: 5.1, dependencePct: 1.0, quantumOfWorkPct: 1.9 },
        { stateCode: '08', state: 'Haryana', currentUsePct: 15.5, dependencePct: 2.2, quantumOfWorkPct: 5.2 },
        { stateCode: '09', state: 'Himachal Pradesh', currentUsePct: 18.3, dependencePct: 3.0, quantumOfWorkPct: 6.7 },
        { stateCode: '10', state: 'Jammu & Kashmir', currentUsePct: 6.5, dependencePct: 0.5, quantumOfWorkPct: 1.4 },
        { stateCode: '11', state: 'Karnataka', currentUsePct: 21.5, dependencePct: 3.7, quantumOfWorkPct: 8.1 },
        { stateCode: '12', state: 'Kerala', currentUsePct: 22.4, dependencePct: 3.7, quantumOfWorkPct: 8.0 },
        { stateCode: '13', state: 'Madhya Pradesh', currentUsePct: 13.0, dependencePct: 2.2, quantumOfWorkPct: 5.1 },
        { stateCode: '14', state: 'Maharashtra', currentUsePct: 13.9, dependencePct: 2.5, quantumOfWorkPct: 5.3 },
        { stateCode: '15', state: 'Manipur', currentUsePct: 8.5, dependencePct: 1.1, quantumOfWorkPct: 2.6 },
        { stateCode: '16', state: 'Meghalaya', currentUsePct: 26.3, dependencePct: 3.5, quantumOfWorkPct: 7.3 },
        { stateCode: '17', state: 'Mizoram', currentUsePct: 22.5, dependencePct: 3.5, quantumOfWorkPct: 8.1 },
        { stateCode: '18', state: 'Nagaland', currentUsePct: 18.5, dependencePct: 2.7, quantumOfWorkPct: 6.3 },
        { stateCode: '19', state: 'Odisha', currentUsePct: 18.6, dependencePct: 2.9, quantumOfWorkPct: 6.2 },
        { stateCode: '20', state: 'Punjab', currentUsePct: 14.9, dependencePct: 2.5, quantumOfWorkPct: 5.8 },
        { stateCode: '21', state: 'Rajasthan', currentUsePct: 10.5, dependencePct: 1.7, quantumOfWorkPct: 3.7 },
        { stateCode: '22', state: 'Sikkim', currentUsePct: 37.5, dependencePct: 6.4, quantumOfWorkPct: 13.2 },
        { stateCode: '23', state: 'Tamil Nadu', currentUsePct: 17.4, dependencePct: 3.4, quantumOfWorkPct: 7.6 },
        { stateCode: '24', state: 'Telangana', currentUsePct: 21.0, dependencePct: 4.5, quantumOfWorkPct: 9.5 },
        { stateCode: '25', state: 'Tripura', currentUsePct: 19.3, dependencePct: 2.7, quantumOfWorkPct: 5.9 },
        { stateCode: '26', state: 'Uttar Pradesh', currentUsePct: 15.6, dependencePct: 2.4, quantumOfWorkPct: 5.2 },
        { stateCode: '27', state: 'West Bengal', currentUsePct: 20.3, dependencePct: 3.5, quantumOfWorkPct: 7.4 },
        { stateCode: '28', state: 'Andaman & Nicobar Islands', currentUsePct: 25.3, dependencePct: 4.0, quantumOfWorkPct: 8.1 },
        { stateCode: '29', state: 'Chandigarh', currentUsePct: 14.1, dependencePct: 2.7, quantumOfWorkPct: 6.2 },
        { stateCode: '30', state: 'Dadra & Nagar Haveli', currentUsePct: 14.3, dependencePct: 2.4, quantumOfWorkPct: 5.3 },
        { stateCode: '31', state: 'Daman & Diu', currentUsePct: 22.2, dependencePct: 3.5, quantumOfWorkPct: 6.6 },
        { stateCode: '32', state: 'Delhi', currentUsePct: 9.0, dependencePct: 1.5, quantumOfWorkPct: 3.3 },
        { stateCode: '33', state: 'Lakshadweep', currentUsePct: 6.6, dependencePct: 0.3, quantumOfWorkPct: 0.7 },
        { stateCode: '34', state: 'Puducherry', currentUsePct: 28.8, dependencePct: 6.1, quantumOfWorkPct: 13.4 },
        { stateCode: '35', state: 'Chhattisgarh', currentUsePct: 28.9, dependencePct: 5.3, quantumOfWorkPct: 11.3 },
        { stateCode: '36', state: 'Jharkhand', currentUsePct: 17.9, dependencePct: 3.0, quantumOfWorkPct: 6.1 },
      ],
    },

    // ── CANNABIS ─────────────────────────────────────────────
    {
      substance: 'cannabis',
      label: 'Cannabis',
      definition:
        'Bhang plus ganja/marijuana and charas/hashish unless otherwise specified.',
      india: {
        currentUsePct: 2.83,
        dependencePct: 0.25,
        quantumOfWorkPct: 0.66,
        estimatedCurrentUsers: '3.1 crore',
        estimatedDependent: '25 lakh',
        estimatedProblemUsers: '72 lakh',
        notes: [
          'Bhang problem users ≈ 40 lakh.',
          'Charas/Ganja problem users ≈ 50 lakh.',
          'About 1 in 16 bhang users were dependent.',
          'About 1 in 7 ganja/charas users were dependent.',
        ],
      },
      states: [
        { stateCode: '01', state: 'Andhra Pradesh', currentUsePct: 1.26, dependencePct: 0.10, quantumOfWorkPct: 0.26 },
        { stateCode: '02', state: 'Arunachal Pradesh', currentUsePct: 2.47, dependencePct: 0.19, quantumOfWorkPct: 0.50 },
        { stateCode: '03', state: 'Assam', currentUsePct: 3.60, dependencePct: 0.29, quantumOfWorkPct: 0.80 },
        { stateCode: '04', state: 'Bihar', currentUsePct: 4.67, dependencePct: 0.45, quantumOfWorkPct: 1.13 },
        { stateCode: '05', state: 'Uttarakhand', currentUsePct: 3.38, dependencePct: 0.53, quantumOfWorkPct: 1.02 },
        { stateCode: '06', state: 'Goa', currentUsePct: 0.93, dependencePct: 0.07, quantumOfWorkPct: 0.16 },
        { stateCode: '07', state: 'Gujarat', currentUsePct: 1.41, dependencePct: 0.13, quantumOfWorkPct: 0.32 },
        { stateCode: '08', state: 'Haryana', currentUsePct: 2.99, dependencePct: 0.27, quantumOfWorkPct: 0.68 },
        { stateCode: '09', state: 'Himachal Pradesh', currentUsePct: 8.26, dependencePct: 0.73, quantumOfWorkPct: 1.92 },
        { stateCode: '10', state: 'Jammu & Kashmir', currentUsePct: 5.78, dependencePct: 0.43, quantumOfWorkPct: 1.10 },
        { stateCode: '11', state: 'Karnataka', currentUsePct: 2.53, dependencePct: 0.20, quantumOfWorkPct: 0.52 },
        { stateCode: '12', state: 'Kerala', currentUsePct: 1.16, dependencePct: 0.13, quantumOfWorkPct: 0.28 },
        { stateCode: '13', state: 'Madhya Pradesh', currentUsePct: 5.91, dependencePct: 0.50, quantumOfWorkPct: 1.28 },
        { stateCode: '14', state: 'Maharashtra', currentUsePct: 1.28, dependencePct: 0.10, quantumOfWorkPct: 0.26 },
        { stateCode: '15', state: 'Manipur', currentUsePct: 2.13, dependencePct: 0.17, quantumOfWorkPct: 0.44 },
        { stateCode: '16', state: 'Meghalaya', currentUsePct: 4.65, dependencePct: 0.38, quantumOfWorkPct: 0.98 },
        { stateCode: '17', state: 'Mizoram', currentUsePct: 1.38, dependencePct: 0.10, quantumOfWorkPct: 0.26 },
        { stateCode: '18', state: 'Nagaland', currentUsePct: 2.55, dependencePct: 0.22, quantumOfWorkPct: 0.58 },
        { stateCode: '19', state: 'Odisha', currentUsePct: 4.81, dependencePct: 0.43, quantumOfWorkPct: 1.10 },
        { stateCode: '20', state: 'Punjab', currentUsePct: 1.47, dependencePct: 0.14, quantumOfWorkPct: 0.35 },
        { stateCode: '21', state: 'Rajasthan', currentUsePct: 3.68, dependencePct: 0.30, quantumOfWorkPct: 0.78 },
        { stateCode: '22', state: 'Sikkim', currentUsePct: 4.35, dependencePct: 0.39, quantumOfWorkPct: 0.99 },
        { stateCode: '23', state: 'Tamil Nadu', currentUsePct: 1.22, dependencePct: 0.11, quantumOfWorkPct: 0.27 },
        { stateCode: '24', state: 'Telangana', currentUsePct: 2.64, dependencePct: 0.24, quantumOfWorkPct: 0.60 },
        { stateCode: '25', state: 'Tripura', currentUsePct: 2.34, dependencePct: 0.19, quantumOfWorkPct: 0.49 },
        { stateCode: '26', state: 'Uttar Pradesh', currentUsePct: 3.77, dependencePct: 0.33, quantumOfWorkPct: 0.85 },
        { stateCode: '27', state: 'West Bengal', currentUsePct: 3.28, dependencePct: 0.29, quantumOfWorkPct: 0.73 },
        { stateCode: '28', state: 'Andaman & Nicobar Islands', currentUsePct: 2.07, dependencePct: 0.17, quantumOfWorkPct: 0.44 },
        { stateCode: '29', state: 'Chandigarh', currentUsePct: 1.84, dependencePct: 0.17, quantumOfWorkPct: 0.43 },
        { stateCode: '30', state: 'Dadra & Nagar Haveli', currentUsePct: 1.37, dependencePct: 0.11, quantumOfWorkPct: 0.28 },
        { stateCode: '31', state: 'Daman & Diu', currentUsePct: 1.26, dependencePct: 0.10, quantumOfWorkPct: 0.25 },
        { stateCode: '32', state: 'Delhi', currentUsePct: 1.43, dependencePct: 0.14, quantumOfWorkPct: 0.35 },
        { stateCode: '33', state: 'Lakshadweep', currentUsePct: 0.36, dependencePct: null, quantumOfWorkPct: 0.04 },
        { stateCode: '34', state: 'Puducherry', currentUsePct: 1.41, dependencePct: 0.13, quantumOfWorkPct: 0.32 },
        { stateCode: '35', state: 'Chhattisgarh', currentUsePct: 6.13, dependencePct: 0.55, quantumOfWorkPct: 1.40 },
        { stateCode: '36', state: 'Jharkhand', currentUsePct: 5.62, dependencePct: 0.51, quantumOfWorkPct: 1.30 },
      ],
    },

    // ── OPIOIDS ──────────────────────────────────────────────
    {
      substance: 'opioids',
      label: 'Opioids',
      definition:
        'Opium including doda/phukki/poppy husk; heroin including brown sugar/smack; pharmaceutical opioids.',
      india: {
        currentUsePct: 2.06,
        dependencePct: 0.26,
        quantumOfWorkPct: 0.70,
        estimatedCurrentUsers: '2.26 crore',
        estimatedDependent: '28 lakh',
        estimatedProblemUsers: '77 lakh',
        notes: [
          'Heroin current use = 1.14%.',
          'Pharmaceutical opioids current use = 0.96%.',
          'Opium current use = 0.52%.',
          'Heroin contributes the largest burden of opioid dependence.',
          'Heroin has surpassed opium as the most commonly used opioid nationally.',
        ],
      },
      states: [
        { stateCode: '01', state: 'Andhra Pradesh', currentUsePct: 1.07, dependencePct: 0.14, quantumOfWorkPct: 0.37 },
        { stateCode: '02', state: 'Arunachal Pradesh', currentUsePct: 3.67, dependencePct: 0.44, quantumOfWorkPct: 1.17 },
        { stateCode: '03', state: 'Assam', currentUsePct: 2.72, dependencePct: 0.32, quantumOfWorkPct: 0.87 },
        { stateCode: '04', state: 'Bihar', currentUsePct: 1.16, dependencePct: 0.13, quantumOfWorkPct: 0.36 },
        { stateCode: '05', state: 'Uttarakhand', currentUsePct: 2.58, dependencePct: 0.32, quantumOfWorkPct: 0.80 },
        { stateCode: '06', state: 'Goa', currentUsePct: 0.54, dependencePct: 0.07, quantumOfWorkPct: 0.18 },
        { stateCode: '07', state: 'Gujarat', currentUsePct: 1.12, dependencePct: 0.13, quantumOfWorkPct: 0.36 },
        { stateCode: '08', state: 'Haryana', currentUsePct: 4.59, dependencePct: 0.58, quantumOfWorkPct: 1.55 },
        { stateCode: '09', state: 'Himachal Pradesh', currentUsePct: 2.46, dependencePct: 0.29, quantumOfWorkPct: 0.79 },
        { stateCode: '10', state: 'Jammu & Kashmir', currentUsePct: 2.78, dependencePct: 0.33, quantumOfWorkPct: 0.90 },
        { stateCode: '11', state: 'Karnataka', currentUsePct: 1.08, dependencePct: 0.13, quantumOfWorkPct: 0.36 },
        { stateCode: '12', state: 'Kerala', currentUsePct: 1.74, dependencePct: 0.23, quantumOfWorkPct: 0.61 },
        { stateCode: '13', state: 'Madhya Pradesh', currentUsePct: 1.41, dependencePct: 0.17, quantumOfWorkPct: 0.46 },
        { stateCode: '14', state: 'Maharashtra', currentUsePct: 1.19, dependencePct: 0.16, quantumOfWorkPct: 0.43 },
        { stateCode: '15', state: 'Manipur', currentUsePct: 6.09, dependencePct: 0.73, quantumOfWorkPct: 1.97 },
        { stateCode: '16', state: 'Meghalaya', currentUsePct: 1.91, dependencePct: 0.22, quantumOfWorkPct: 0.59 },
        { stateCode: '17', state: 'Mizoram', currentUsePct: 3.27, dependencePct: 0.39, quantumOfWorkPct: 1.05 },
        { stateCode: '18', state: 'Nagaland', currentUsePct: 4.41, dependencePct: 0.53, quantumOfWorkPct: 1.43 },
        { stateCode: '19', state: 'Odisha', currentUsePct: 1.17, dependencePct: 0.14, quantumOfWorkPct: 0.38 },
        { stateCode: '20', state: 'Punjab', currentUsePct: 7.26, dependencePct: 0.93, quantumOfWorkPct: 2.49 },
        { stateCode: '21', state: 'Rajasthan', currentUsePct: 2.01, dependencePct: 0.24, quantumOfWorkPct: 0.65 },
        { stateCode: '22', state: 'Sikkim', currentUsePct: 3.23, dependencePct: 0.39, quantumOfWorkPct: 1.04 },
        { stateCode: '23', state: 'Tamil Nadu', currentUsePct: 1.24, dependencePct: 0.16, quantumOfWorkPct: 0.43 },
        { stateCode: '24', state: 'Telangana', currentUsePct: 1.41, dependencePct: 0.18, quantumOfWorkPct: 0.48 },
        { stateCode: '25', state: 'Tripura', currentUsePct: 2.31, dependencePct: 0.28, quantumOfWorkPct: 0.75 },
        { stateCode: '26', state: 'Uttar Pradesh', currentUsePct: 2.18, dependencePct: 0.27, quantumOfWorkPct: 0.72 },
        { stateCode: '27', state: 'West Bengal', currentUsePct: 1.83, dependencePct: 0.23, quantumOfWorkPct: 0.61 },
        { stateCode: '28', state: 'Andaman & Nicobar Islands', currentUsePct: 1.12, dependencePct: 0.13, quantumOfWorkPct: 0.36 },
        { stateCode: '29', state: 'Chandigarh', currentUsePct: 3.44, dependencePct: 0.44, quantumOfWorkPct: 1.17 },
        { stateCode: '30', state: 'Dadra & Nagar Haveli', currentUsePct: 0.83, dependencePct: 0.09, quantumOfWorkPct: 0.26 },
        { stateCode: '31', state: 'Daman & Diu', currentUsePct: 0.71, dependencePct: 0.08, quantumOfWorkPct: 0.22 },
        { stateCode: '32', state: 'Delhi', currentUsePct: 2.01, dependencePct: 0.26, quantumOfWorkPct: 0.70 },
        { stateCode: '33', state: 'Lakshadweep', currentUsePct: 0.11, dependencePct: null, quantumOfWorkPct: 0.01 },
        { stateCode: '34', state: 'Puducherry', currentUsePct: 1.72, dependencePct: 0.23, quantumOfWorkPct: 0.61 },
        { stateCode: '35', state: 'Chhattisgarh', currentUsePct: 1.07, dependencePct: 0.12, quantumOfWorkPct: 0.34 },
        { stateCode: '36', state: 'Jharkhand', currentUsePct: 1.21, dependencePct: 0.15, quantumOfWorkPct: 0.39 },
      ],
    },

    // ── SEDATIVES ────────────────────────────────────────────
    {
      substance: 'sedatives',
      label: 'Sedatives',
      definition:
        'Non-medical/non-prescription use only. Includes benzodiazepines and other prescription sedatives used without medical supervision.',
      india: {
        currentUsePct: 1.08,
        dependencePct: 0.11,
        quantumOfWorkPct: 0.20,
        estimatedCurrentUsers: '1.18 crore',
        estimatedDependent: null,
        estimatedProblemUsers: null,
        notes: [
          'Use must be interpreted as non-medical/non-prescription use only.',
        ],
      },
      states: [
        { stateCode: '01', state: 'Andhra Pradesh', currentUsePct: 1.85, dependencePct: 0.19, quantumOfWorkPct: 0.34 },
        { stateCode: '02', state: 'Arunachal Pradesh', currentUsePct: 2.87, dependencePct: 0.28, quantumOfWorkPct: 0.52 },
        { stateCode: '03', state: 'Assam', currentUsePct: 1.23, dependencePct: 0.12, quantumOfWorkPct: 0.22 },
        { stateCode: '04', state: 'Bihar', currentUsePct: 0.49, dependencePct: 0.04, quantumOfWorkPct: 0.09 },
        { stateCode: '05', state: 'Uttarakhand', currentUsePct: 2.09, dependencePct: 0.21, quantumOfWorkPct: 0.39 },
        { stateCode: '06', state: 'Goa', currentUsePct: 0.61, dependencePct: 0.06, quantumOfWorkPct: 0.11 },
        { stateCode: '07', state: 'Gujarat', currentUsePct: 0.90, dependencePct: 0.09, quantumOfWorkPct: 0.16 },
        { stateCode: '08', state: 'Haryana', currentUsePct: 1.61, dependencePct: 0.16, quantumOfWorkPct: 0.29 },
        { stateCode: '09', state: 'Himachal Pradesh', currentUsePct: 1.58, dependencePct: 0.16, quantumOfWorkPct: 0.29 },
        { stateCode: '10', state: 'Jammu & Kashmir', currentUsePct: 2.29, dependencePct: 0.23, quantumOfWorkPct: 0.42 },
        { stateCode: '11', state: 'Karnataka', currentUsePct: 1.12, dependencePct: 0.11, quantumOfWorkPct: 0.20 },
        { stateCode: '12', state: 'Kerala', currentUsePct: 1.26, dependencePct: 0.13, quantumOfWorkPct: 0.23 },
        { stateCode: '13', state: 'Madhya Pradesh', currentUsePct: 0.91, dependencePct: 0.09, quantumOfWorkPct: 0.17 },
        { stateCode: '14', state: 'Maharashtra', currentUsePct: 0.88, dependencePct: 0.09, quantumOfWorkPct: 0.16 },
        { stateCode: '15', state: 'Manipur', currentUsePct: 4.41, dependencePct: 0.46, quantumOfWorkPct: 0.84 },
        { stateCode: '16', state: 'Meghalaya', currentUsePct: 2.30, dependencePct: 0.23, quantumOfWorkPct: 0.43 },
        { stateCode: '17', state: 'Mizoram', currentUsePct: 2.08, dependencePct: 0.21, quantumOfWorkPct: 0.39 },
        { stateCode: '18', state: 'Nagaland', currentUsePct: 2.26, dependencePct: 0.23, quantumOfWorkPct: 0.42 },
        { stateCode: '19', state: 'Odisha', currentUsePct: 0.66, dependencePct: 0.06, quantumOfWorkPct: 0.12 },
        { stateCode: '20', state: 'Punjab', currentUsePct: 2.30, dependencePct: 0.24, quantumOfWorkPct: 0.43 },
        { stateCode: '21', state: 'Rajasthan', currentUsePct: 0.85, dependencePct: 0.08, quantumOfWorkPct: 0.16 },
        { stateCode: '22', state: 'Sikkim', currentUsePct: 2.57, dependencePct: 0.27, quantumOfWorkPct: 0.49 },
        { stateCode: '23', state: 'Tamil Nadu', currentUsePct: 0.84, dependencePct: 0.08, quantumOfWorkPct: 0.15 },
        { stateCode: '24', state: 'Telangana', currentUsePct: 1.62, dependencePct: 0.17, quantumOfWorkPct: 0.30 },
        { stateCode: '25', state: 'Tripura', currentUsePct: 1.47, dependencePct: 0.15, quantumOfWorkPct: 0.27 },
        { stateCode: '26', state: 'Uttar Pradesh', currentUsePct: 0.89, dependencePct: 0.09, quantumOfWorkPct: 0.16 },
        { stateCode: '27', state: 'West Bengal', currentUsePct: 1.09, dependencePct: 0.11, quantumOfWorkPct: 0.20 },
        { stateCode: '28', state: 'Andaman & Nicobar Islands', currentUsePct: 1.25, dependencePct: 0.13, quantumOfWorkPct: 0.23 },
        { stateCode: '29', state: 'Chandigarh', currentUsePct: 1.49, dependencePct: 0.15, quantumOfWorkPct: 0.28 },
        { stateCode: '30', state: 'Dadra & Nagar Haveli', currentUsePct: 0.56, dependencePct: 0.05, quantumOfWorkPct: 0.10 },
        { stateCode: '31', state: 'Daman & Diu', currentUsePct: 0.66, dependencePct: 0.07, quantumOfWorkPct: 0.12 },
        { stateCode: '32', state: 'Delhi', currentUsePct: 1.53, dependencePct: 0.16, quantumOfWorkPct: 0.29 },
        { stateCode: '33', state: 'Lakshadweep', currentUsePct: 0.08, dependencePct: null, quantumOfWorkPct: 0.01 },
        { stateCode: '34', state: 'Puducherry', currentUsePct: 1.02, dependencePct: 0.10, quantumOfWorkPct: 0.19 },
        { stateCode: '35', state: 'Chhattisgarh', currentUsePct: 0.75, dependencePct: 0.07, quantumOfWorkPct: 0.14 },
        { stateCode: '36', state: 'Jharkhand', currentUsePct: 0.61, dependencePct: 0.06, quantumOfWorkPct: 0.11 },
      ],
    },

    // ── COCAINE ──────────────────────────────────────────────
    {
      substance: 'cocaine',
      label: 'Cocaine',
      definition: 'Cocaine in any form.',
      india: {
        currentUsePct: 0.10,
        dependencePct: 0.02,
        quantumOfWorkPct: 0.03,
        estimatedCurrentUsers: '10.7 lakh',
        estimatedDependent: null,
        estimatedProblemUsers: '3.2 lakh',
        notes: [
          'Male current use = 0.18%; Female = 0.01%.',
        ],
      },
      states: [
        { stateCode: '01', state: 'Andhra Pradesh', currentUsePct: 0.07, dependencePct: null, quantumOfWorkPct: 0.02 },
        { stateCode: '02', state: 'Arunachal Pradesh', currentUsePct: 0.22, dependencePct: null, quantumOfWorkPct: 0.05 },
        { stateCode: '03', state: 'Assam', currentUsePct: 0.12, dependencePct: null, quantumOfWorkPct: 0.03 },
        { stateCode: '04', state: 'Bihar', currentUsePct: 0.03, dependencePct: null, quantumOfWorkPct: 0.01 },
        { stateCode: '05', state: 'Uttarakhand', currentUsePct: 0.02, dependencePct: null, quantumOfWorkPct: 0.01 },
        { stateCode: '06', state: 'Goa', currentUsePct: 0.35, dependencePct: null, quantumOfWorkPct: 0.08 },
        { stateCode: '07', state: 'Gujarat', currentUsePct: 0.04, dependencePct: null, quantumOfWorkPct: 0.01 },
        { stateCode: '08', state: 'Haryana', currentUsePct: 0.10, dependencePct: null, quantumOfWorkPct: 0.03 },
        { stateCode: '09', state: 'Himachal Pradesh', currentUsePct: 0.08, dependencePct: null, quantumOfWorkPct: 0.02 },
        { stateCode: '10', state: 'Jammu & Kashmir', currentUsePct: 0.04, dependencePct: null, quantumOfWorkPct: 0.01 },
        { stateCode: '11', state: 'Karnataka', currentUsePct: 0.16, dependencePct: null, quantumOfWorkPct: 0.04 },
        { stateCode: '12', state: 'Kerala', currentUsePct: 0.09, dependencePct: null, quantumOfWorkPct: 0.03 },
        { stateCode: '13', state: 'Madhya Pradesh', currentUsePct: 0.05, dependencePct: null, quantumOfWorkPct: 0.01 },
        { stateCode: '14', state: 'Maharashtra', currentUsePct: 0.26, dependencePct: null, quantumOfWorkPct: 0.07 },
        { stateCode: '15', state: 'Manipur', currentUsePct: 0.07, dependencePct: null, quantumOfWorkPct: 0.02 },
        { stateCode: '16', state: 'Meghalaya', currentUsePct: 0.27, dependencePct: null, quantumOfWorkPct: 0.07 },
        { stateCode: '17', state: 'Mizoram', currentUsePct: 0.06, dependencePct: null, quantumOfWorkPct: 0.02 },
        { stateCode: '18', state: 'Nagaland', currentUsePct: 0.14, dependencePct: null, quantumOfWorkPct: 0.04 },
        { stateCode: '19', state: 'Odisha', currentUsePct: 0.03, dependencePct: null, quantumOfWorkPct: 0.01 },
        { stateCode: '20', state: 'Punjab', currentUsePct: 0.06, dependencePct: null, quantumOfWorkPct: 0.02 },
        { stateCode: '21', state: 'Rajasthan', currentUsePct: 0.04, dependencePct: null, quantumOfWorkPct: 0.01 },
        { stateCode: '22', state: 'Sikkim', currentUsePct: 0.34, dependencePct: null, quantumOfWorkPct: 0.08 },
        { stateCode: '23', state: 'Tamil Nadu', currentUsePct: 0.07, dependencePct: null, quantumOfWorkPct: 0.02 },
        { stateCode: '24', state: 'Telangana', currentUsePct: 0.19, dependencePct: null, quantumOfWorkPct: 0.05 },
        { stateCode: '25', state: 'Tripura', currentUsePct: 0.06, dependencePct: null, quantumOfWorkPct: 0.02 },
        { stateCode: '26', state: 'Uttar Pradesh', currentUsePct: 0.04, dependencePct: null, quantumOfWorkPct: 0.01 },
        { stateCode: '27', state: 'West Bengal', currentUsePct: 0.06, dependencePct: null, quantumOfWorkPct: 0.02 },
        { stateCode: '28', state: 'Andaman & Nicobar Islands', currentUsePct: 0.15, dependencePct: null, quantumOfWorkPct: 0.04 },
        { stateCode: '29', state: 'Chandigarh', currentUsePct: 0.13, dependencePct: null, quantumOfWorkPct: 0.03 },
        { stateCode: '30', state: 'Dadra & Nagar Haveli', currentUsePct: 0.06, dependencePct: null, quantumOfWorkPct: 0.02 },
        { stateCode: '31', state: 'Daman & Diu', currentUsePct: 0.11, dependencePct: null, quantumOfWorkPct: 0.03 },
        { stateCode: '32', state: 'Delhi', currentUsePct: 0.22, dependencePct: null, quantumOfWorkPct: 0.06 },
        { stateCode: '33', state: 'Lakshadweep', currentUsePct: null, dependencePct: null, quantumOfWorkPct: null },
        { stateCode: '34', state: 'Puducherry', currentUsePct: 0.10, dependencePct: null, quantumOfWorkPct: 0.03 },
        { stateCode: '35', state: 'Chhattisgarh', currentUsePct: 0.04, dependencePct: null, quantumOfWorkPct: 0.01 },
        { stateCode: '36', state: 'Jharkhand', currentUsePct: 0.04, dependencePct: null, quantumOfWorkPct: 0.01 },
      ],
    },

    // ── ATS ──────────────────────────────────────────────────
    {
      substance: 'ats',
      label: 'Amphetamine Type Stimulants (ATS)',
      definition:
        'Amphetamines, methamphetamines, and related stimulants.',
      india: {
        currentUsePct: 0.18,
        dependencePct: 0.02,
        quantumOfWorkPct: 0.06,
        estimatedCurrentUsers: '19.4 lakh',
        estimatedDependent: null,
        estimatedProblemUsers: '7 lakh',
        notes: [],
      },
      states: [
        { stateCode: '01', state: 'Andhra Pradesh', currentUsePct: 0.10, dependencePct: null, quantumOfWorkPct: 0.04 },
        { stateCode: '02', state: 'Arunachal Pradesh', currentUsePct: 0.52, dependencePct: null, quantumOfWorkPct: 0.17 },
        { stateCode: '03', state: 'Assam', currentUsePct: 0.24, dependencePct: null, quantumOfWorkPct: 0.08 },
        { stateCode: '04', state: 'Bihar', currentUsePct: 0.05, dependencePct: null, quantumOfWorkPct: 0.02 },
        { stateCode: '05', state: 'Uttarakhand', currentUsePct: 0.03, dependencePct: null, quantumOfWorkPct: 0.01 },
        { stateCode: '06', state: 'Goa', currentUsePct: 0.55, dependencePct: null, quantumOfWorkPct: 0.18 },
        { stateCode: '07', state: 'Gujarat', currentUsePct: 0.06, dependencePct: null, quantumOfWorkPct: 0.02 },
        { stateCode: '08', state: 'Haryana', currentUsePct: 0.11, dependencePct: null, quantumOfWorkPct: 0.04 },
        { stateCode: '09', state: 'Himachal Pradesh', currentUsePct: 0.09, dependencePct: null, quantumOfWorkPct: 0.03 },
        { stateCode: '10', state: 'Jammu & Kashmir', currentUsePct: 0.07, dependencePct: null, quantumOfWorkPct: 0.02 },
        { stateCode: '11', state: 'Karnataka', currentUsePct: 0.27, dependencePct: null, quantumOfWorkPct: 0.09 },
        { stateCode: '12', state: 'Kerala', currentUsePct: 0.14, dependencePct: null, quantumOfWorkPct: 0.05 },
        { stateCode: '13', state: 'Madhya Pradesh', currentUsePct: 0.08, dependencePct: null, quantumOfWorkPct: 0.03 },
        { stateCode: '14', state: 'Maharashtra', currentUsePct: 0.37, dependencePct: null, quantumOfWorkPct: 0.12 },
        { stateCode: '15', state: 'Manipur', currentUsePct: 0.29, dependencePct: null, quantumOfWorkPct: 0.10 },
        { stateCode: '16', state: 'Meghalaya', currentUsePct: 0.41, dependencePct: null, quantumOfWorkPct: 0.14 },
        { stateCode: '17', state: 'Mizoram', currentUsePct: 0.39, dependencePct: null, quantumOfWorkPct: 0.13 },
        { stateCode: '18', state: 'Nagaland', currentUsePct: 0.46, dependencePct: null, quantumOfWorkPct: 0.15 },
        { stateCode: '19', state: 'Odisha', currentUsePct: 0.08, dependencePct: null, quantumOfWorkPct: 0.03 },
        { stateCode: '20', state: 'Punjab', currentUsePct: 0.10, dependencePct: null, quantumOfWorkPct: 0.03 },
        { stateCode: '21', state: 'Rajasthan', currentUsePct: 0.07, dependencePct: null, quantumOfWorkPct: 0.02 },
        { stateCode: '22', state: 'Sikkim', currentUsePct: 0.55, dependencePct: null, quantumOfWorkPct: 0.18 },
        { stateCode: '23', state: 'Tamil Nadu', currentUsePct: 0.11, dependencePct: null, quantumOfWorkPct: 0.04 },
        { stateCode: '24', state: 'Telangana', currentUsePct: 0.29, dependencePct: null, quantumOfWorkPct: 0.10 },
        { stateCode: '25', state: 'Tripura', currentUsePct: 0.34, dependencePct: null, quantumOfWorkPct: 0.11 },
        { stateCode: '26', state: 'Uttar Pradesh', currentUsePct: 0.07, dependencePct: null, quantumOfWorkPct: 0.02 },
        { stateCode: '27', state: 'West Bengal', currentUsePct: 0.13, dependencePct: null, quantumOfWorkPct: 0.04 },
        { stateCode: '28', state: 'Andaman & Nicobar Islands', currentUsePct: 0.24, dependencePct: null, quantumOfWorkPct: 0.08 },
        { stateCode: '29', state: 'Chandigarh', currentUsePct: 0.15, dependencePct: null, quantumOfWorkPct: 0.05 },
        { stateCode: '30', state: 'Dadra & Nagar Haveli', currentUsePct: 0.09, dependencePct: null, quantumOfWorkPct: 0.03 },
        { stateCode: '31', state: 'Daman & Diu', currentUsePct: 0.13, dependencePct: null, quantumOfWorkPct: 0.04 },
        { stateCode: '32', state: 'Delhi', currentUsePct: 0.32, dependencePct: null, quantumOfWorkPct: 0.11 },
        { stateCode: '33', state: 'Lakshadweep', currentUsePct: null, dependencePct: null, quantumOfWorkPct: null },
        { stateCode: '34', state: 'Puducherry', currentUsePct: 0.14, dependencePct: null, quantumOfWorkPct: 0.05 },
        { stateCode: '35', state: 'Chhattisgarh', currentUsePct: 0.06, dependencePct: null, quantumOfWorkPct: 0.02 },
        { stateCode: '36', state: 'Jharkhand', currentUsePct: 0.07, dependencePct: null, quantumOfWorkPct: 0.02 },
      ],
    },

    // ── INHALANTS ────────────────────────────────────────────
    {
      substance: 'inhalants',
      label: 'Inhalants',
      definition:
        'Volatile substances inhaled for psychoactive effect (e.g. glue, petrol, solvents).',
      india: {
        currentUsePct: 0.70,
        dependencePct: 0.08,
        quantumOfWorkPct: 0.21,
        estimatedCurrentUsers: '77 lakh',
        estimatedDependent: '8.5 lakh',
        estimatedProblemUsers: '22 lakh',
        notes: [
          'ONLY substance where prevalence among children is higher than adults.',
          'Approximately 4.58 lakh children need help for problematic inhalant use.',
          'Approximately 18 lakh adults need help for problematic inhalant use.',
        ],
      },
      states: [
        { stateCode: '01', state: 'Andhra Pradesh', currentUsePct: 0.48, dependencePct: 0.06, quantumOfWorkPct: 0.15 },
        { stateCode: '02', state: 'Arunachal Pradesh', currentUsePct: 1.24, dependencePct: 0.14, quantumOfWorkPct: 0.38 },
        { stateCode: '03', state: 'Assam', currentUsePct: 0.70, dependencePct: 0.08, quantumOfWorkPct: 0.21 },
        { stateCode: '04', state: 'Bihar', currentUsePct: 0.54, dependencePct: 0.06, quantumOfWorkPct: 0.17 },
        { stateCode: '05', state: 'Uttarakhand', currentUsePct: 1.00, dependencePct: 0.11, quantumOfWorkPct: 0.29 },
        { stateCode: '06', state: 'Goa', currentUsePct: 0.39, dependencePct: 0.04, quantumOfWorkPct: 0.12 },
        { stateCode: '07', state: 'Gujarat', currentUsePct: 0.52, dependencePct: 0.06, quantumOfWorkPct: 0.16 },
        { stateCode: '08', state: 'Haryana', currentUsePct: 0.92, dependencePct: 0.11, quantumOfWorkPct: 0.28 },
        { stateCode: '09', state: 'Himachal Pradesh', currentUsePct: 0.79, dependencePct: 0.09, quantumOfWorkPct: 0.24 },
        { stateCode: '10', state: 'Jammu & Kashmir', currentUsePct: 0.55, dependencePct: 0.06, quantumOfWorkPct: 0.17 },
        { stateCode: '11', state: 'Karnataka', currentUsePct: 0.62, dependencePct: 0.07, quantumOfWorkPct: 0.19 },
        { stateCode: '12', state: 'Kerala', currentUsePct: 0.39, dependencePct: 0.04, quantumOfWorkPct: 0.12 },
        { stateCode: '13', state: 'Madhya Pradesh', currentUsePct: 1.07, dependencePct: 0.12, quantumOfWorkPct: 0.33 },
        { stateCode: '14', state: 'Maharashtra', currentUsePct: 0.71, dependencePct: 0.08, quantumOfWorkPct: 0.22 },
        { stateCode: '15', state: 'Manipur', currentUsePct: 0.58, dependencePct: 0.07, quantumOfWorkPct: 0.18 },
        { stateCode: '16', state: 'Meghalaya', currentUsePct: 1.10, dependencePct: 0.13, quantumOfWorkPct: 0.34 },
        { stateCode: '17', state: 'Mizoram', currentUsePct: 0.48, dependencePct: 0.05, quantumOfWorkPct: 0.15 },
        { stateCode: '18', state: 'Nagaland', currentUsePct: 0.88, dependencePct: 0.10, quantumOfWorkPct: 0.27 },
        { stateCode: '19', state: 'Odisha', currentUsePct: 0.57, dependencePct: 0.06, quantumOfWorkPct: 0.17 },
        { stateCode: '20', state: 'Punjab', currentUsePct: 0.65, dependencePct: 0.07, quantumOfWorkPct: 0.20 },
        { stateCode: '21', state: 'Rajasthan', currentUsePct: 0.77, dependencePct: 0.09, quantumOfWorkPct: 0.24 },
        { stateCode: '22', state: 'Sikkim', currentUsePct: 0.72, dependencePct: 0.08, quantumOfWorkPct: 0.22 },
        { stateCode: '23', state: 'Tamil Nadu', currentUsePct: 0.52, dependencePct: 0.06, quantumOfWorkPct: 0.16 },
        { stateCode: '24', state: 'Telangana', currentUsePct: 0.68, dependencePct: 0.08, quantumOfWorkPct: 0.21 },
        { stateCode: '25', state: 'Tripura', currentUsePct: 0.58, dependencePct: 0.06, quantumOfWorkPct: 0.18 },
        { stateCode: '26', state: 'Uttar Pradesh', currentUsePct: 1.04, dependencePct: 0.12, quantumOfWorkPct: 0.32 },
        { stateCode: '27', state: 'West Bengal', currentUsePct: 0.68, dependencePct: 0.08, quantumOfWorkPct: 0.21 },
        { stateCode: '28', state: 'Andaman & Nicobar Islands', currentUsePct: 0.58, dependencePct: 0.07, quantumOfWorkPct: 0.18 },
        { stateCode: '29', state: 'Chandigarh', currentUsePct: 0.73, dependencePct: 0.08, quantumOfWorkPct: 0.22 },
        { stateCode: '30', state: 'Dadra & Nagar Haveli', currentUsePct: 0.44, dependencePct: 0.05, quantumOfWorkPct: 0.14 },
        { stateCode: '31', state: 'Daman & Diu', currentUsePct: 0.39, dependencePct: 0.04, quantumOfWorkPct: 0.12 },
        { stateCode: '32', state: 'Delhi', currentUsePct: 0.83, dependencePct: 0.09, quantumOfWorkPct: 0.25 },
        { stateCode: '33', state: 'Lakshadweep', currentUsePct: 0.10, dependencePct: null, quantumOfWorkPct: 0.03 },
        { stateCode: '34', state: 'Puducherry', currentUsePct: 0.54, dependencePct: 0.06, quantumOfWorkPct: 0.17 },
        { stateCode: '35', state: 'Chhattisgarh', currentUsePct: 0.89, dependencePct: 0.10, quantumOfWorkPct: 0.27 },
        { stateCode: '36', state: 'Jharkhand', currentUsePct: 0.72, dependencePct: 0.08, quantumOfWorkPct: 0.22 },
      ],
    },

    // ── HALLUCINOGENS ─────────────────────────────────────────
    {
      substance: 'hallucinogens',
      label: 'Hallucinogens',
      definition:
        'Substances that alter perception (e.g. LSD, magic mushrooms, psilocybin).',
      india: {
        currentUsePct: 0.12,
        dependencePct: 0.01,
        quantumOfWorkPct: 0.03,
        estimatedCurrentUsers: '12.6 lakh',
        estimatedDependent: null,
        estimatedProblemUsers: '3.4 lakh',
        notes: [
          'Maharashtra ≈ 6 lakh users.',
          'Telangana ≈ 2 lakh users.',
          'Kerala ≈ 1 lakh users.',
          'Delhi ≈ 63 thousand users.',
        ],
      },
      states: [
        { stateCode: '01', state: 'Andhra Pradesh', currentUsePct: 0.08, dependencePct: null, quantumOfWorkPct: 0.02 },
        { stateCode: '02', state: 'Arunachal Pradesh', currentUsePct: 0.30, dependencePct: null, quantumOfWorkPct: 0.07 },
        { stateCode: '03', state: 'Assam', currentUsePct: 0.12, dependencePct: null, quantumOfWorkPct: 0.03 },
        { stateCode: '04', state: 'Bihar', currentUsePct: 0.04, dependencePct: null, quantumOfWorkPct: 0.01 },
        { stateCode: '05', state: 'Uttarakhand', currentUsePct: 0.08, dependencePct: 0.01, quantumOfWorkPct: 0.02 },
        { stateCode: '06', state: 'Goa', currentUsePct: 0.42, dependencePct: null, quantumOfWorkPct: 0.10 },
        { stateCode: '07', state: 'Gujarat', currentUsePct: 0.05, dependencePct: null, quantumOfWorkPct: 0.01 },
        { stateCode: '08', state: 'Haryana', currentUsePct: 0.10, dependencePct: null, quantumOfWorkPct: 0.02 },
        { stateCode: '09', state: 'Himachal Pradesh', currentUsePct: 0.11, dependencePct: null, quantumOfWorkPct: 0.03 },
        { stateCode: '10', state: 'Jammu & Kashmir', currentUsePct: 0.05, dependencePct: null, quantumOfWorkPct: 0.01 },
        { stateCode: '11', state: 'Karnataka', currentUsePct: 0.14, dependencePct: null, quantumOfWorkPct: 0.04 },
        { stateCode: '12', state: 'Kerala', currentUsePct: 0.18, dependencePct: null, quantumOfWorkPct: 0.04 },
        { stateCode: '13', state: 'Madhya Pradesh', currentUsePct: 0.06, dependencePct: null, quantumOfWorkPct: 0.02 },
        { stateCode: '14', state: 'Maharashtra', currentUsePct: 0.24, dependencePct: null, quantumOfWorkPct: 0.06 },
        { stateCode: '15', state: 'Manipur', currentUsePct: 0.09, dependencePct: null, quantumOfWorkPct: 0.02 },
        { stateCode: '16', state: 'Meghalaya', currentUsePct: 0.31, dependencePct: null, quantumOfWorkPct: 0.07 },
        { stateCode: '17', state: 'Mizoram', currentUsePct: 0.08, dependencePct: null, quantumOfWorkPct: 0.02 },
        { stateCode: '18', state: 'Nagaland', currentUsePct: 0.17, dependencePct: null, quantumOfWorkPct: 0.04 },
        { stateCode: '19', state: 'Odisha', currentUsePct: 0.04, dependencePct: null, quantumOfWorkPct: 0.01 },
        { stateCode: '20', state: 'Punjab', currentUsePct: 0.06, dependencePct: null, quantumOfWorkPct: 0.02 },
        { stateCode: '21', state: 'Rajasthan', currentUsePct: 0.05, dependencePct: null, quantumOfWorkPct: 0.01 },
        { stateCode: '22', state: 'Sikkim', currentUsePct: 0.41, dependencePct: null, quantumOfWorkPct: 0.10 },
        { stateCode: '23', state: 'Tamil Nadu', currentUsePct: 0.09, dependencePct: null, quantumOfWorkPct: 0.02 },
        { stateCode: '24', state: 'Telangana', currentUsePct: 0.28, dependencePct: null, quantumOfWorkPct: 0.07 },
        { stateCode: '25', state: 'Tripura', currentUsePct: 0.07, dependencePct: null, quantumOfWorkPct: 0.02 },
        { stateCode: '26', state: 'Uttar Pradesh', currentUsePct: 0.06, dependencePct: null, quantumOfWorkPct: 0.01 },
        { stateCode: '27', state: 'West Bengal', currentUsePct: 0.10, dependencePct: null, quantumOfWorkPct: 0.02 },
        { stateCode: '28', state: 'Andaman & Nicobar Islands', currentUsePct: 0.18, dependencePct: null, quantumOfWorkPct: 0.04 },
        { stateCode: '29', state: 'Chandigarh', currentUsePct: 0.12, dependencePct: null, quantumOfWorkPct: 0.03 },
        { stateCode: '30', state: 'Dadra & Nagar Haveli', currentUsePct: 0.07, dependencePct: null, quantumOfWorkPct: 0.02 },
        { stateCode: '31', state: 'Daman & Diu', currentUsePct: 0.11, dependencePct: null, quantumOfWorkPct: 0.03 },
        { stateCode: '32', state: 'Delhi', currentUsePct: 0.15, dependencePct: null, quantumOfWorkPct: 0.04 },
        { stateCode: '33', state: 'Lakshadweep', currentUsePct: null, dependencePct: null, quantumOfWorkPct: null },
        { stateCode: '34', state: 'Puducherry', currentUsePct: 0.12, dependencePct: null, quantumOfWorkPct: 0.03 },
        { stateCode: '35', state: 'Chhattisgarh', currentUsePct: 0.05, dependencePct: null, quantumOfWorkPct: 0.01 },
        { stateCode: '36', state: 'Jharkhand', currentUsePct: 0.05, dependencePct: null, quantumOfWorkPct: 0.01 },
      ],
    },
  ],

  // ─────────────────────────────────────────────────────────────
  // PWID DATA
  // ─────────────────────────────────────────────────────────────
  pwid: {
    nationalTotal: 845296,
    nationalTotalLabel: 'approximately 8.5 lakh',
    topStates: [
      { state: 'Uttar Pradesh', estimatedPWID: 100000 },
      { state: 'Punjab', estimatedPWID: 88165 },
      { state: 'Delhi', estimatedPWID: 86909 },
      { state: 'Manipur', estimatedPWID: 69916 },
      { state: 'Andhra Pradesh', estimatedPWID: 64000 },
      { state: 'Telangana', estimatedPWID: 64000 },
      { state: 'Haryana', estimatedPWID: 55358 },
      { state: 'Karnataka', estimatedPWID: 44580 },
      { state: 'Maharashtra', estimatedPWID: 44323 },
      { state: 'Nagaland', estimatedPWID: 33888 },
    ],
    predominantSubstances: [
      { substance: 'Heroin', pct: 46 },
      { substance: 'Buprenorphine / Injectable Pharmaceutical Opioids', pct: 46 },
      { substance: 'Pentazocine', pct: 4 },
      { substance: 'Others (Sedatives / Amphetamine)', pct: 9 },
    ],
    riskBehaviours: [
      { description: 'Daily injecting', pct: 49 },
      { description: 'Injecting 4–6 times per week', pct: 18 },
      { description: 'Reported reusing needles/syringes', pct: 50 },
      { description: 'Shared needles/syringes with peers (last 12 months)', pct: 27 },
      { description: 'Reported vein-related complications', pct: 33 },
      { description: 'Experienced ulcer/abscess at injecting sites', pct: 28 },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // TREATMENT GAP
  // ─────────────────────────────────────────────────────────────
  treatmentGap: {
    alcohol: {
      label: 'Alcohol Dependence',
      triedQuittingPct: null,
      receivedTreatmentPct: 25,
      treatmentSources: [
        { source: 'Spiritual / Religious Help', pct: 33 },
        { source: 'Government Doctor / Health Facility', pct: 25 },
      ],
      receivedInpatientPct: 21,
      treatmentGapStatement:
        '75% of people with alcohol dependence received no treatment. Only 1 in 38 received any help; 1 in 180 received inpatient care. Among those admitted: 36% from govt hospitals, 23% from govt de-addiction centres, 7% from NGO centres.',
    },
    drugs: {
      label: 'Illicit Drug Dependence',
      triedQuittingPct: 44,
      receivedTreatmentPct: 25,
      treatmentSources: [
        { source: 'Government Hospital', pct: 40 },
      ],
      receivedInpatientPct: 44,
      treatmentGapStatement:
        'Approximately 12% of all drug-dependent people received any help/treatment. About 1 in 20 received inpatient treatment. Government hospitals were the most common treatment source (40%).',
    },
    nmhsComparison: {
      alcoholUseDisorderGap: 86,
      otherDrugUseDisorderGap: 73,
      note:
        'National Mental Health Survey (NMHS) comparison: Alcohol use disorder treatment gap = 86%; Other drug use disorder treatment gap = 73%. The NDDTC survey similarly found extremely low treatment access. Substance use disorder treatment demand substantially exceeds treatment availability.',
    },
  },

  // ─────────────────────────────────────────────────────────────
  // YOUTH / INHALANT RISK
  // ─────────────────────────────────────────────────────────────
  youthRisk: {
    keyFinding:
      'Inhalants are the ONLY substance category in this report where prevalence among children/adolescents is HIGHER than among adults.',
    nationalChildrenNeedingHelp: 458000,
    nationalChildrenNeedingHelpLabel: 'approximately 4.58 lakh',
    nationalAdultsNeedingHelp: 1800000,
    nationalAdultsNeedingHelpLabel: 'approximately 18 lakh',
    topStates: [
      { state: 'Uttar Pradesh', childrenNeedingHelp: 94000, label: '94 thousand' },
      { state: 'Madhya Pradesh', childrenNeedingHelp: 50000, label: '50 thousand' },
      { state: 'Maharashtra', childrenNeedingHelp: 40000, label: '40 thousand' },
      { state: 'Delhi', childrenNeedingHelp: 38000, label: '38 thousand' },
      { state: 'Haryana', childrenNeedingHelp: 35000, label: '35 thousand' },
    ],
    allOtherStates: 201000,
  },

  // ─────────────────────────────────────────────────────────────
  // METHODOLOGY
  // ─────────────────────────────────────────────────────────────
  methodology: {
    coverageStatesUTs: 36,
    hhsSampleHouseholds: 200111,
    hhsDistricts: 186,
    hhsIndividuals: 473569,
    hhsAgeRange: '10–75 years',
    hhsPrimaryUnits: 5808,
    hhsResponseRate: 89,
    rdsDistricts: 135,
    rdsStatesUTs: 34,
    rdsPeopleInterviewed: 72642,
    totalPersonnel: 1500,
    dataCollectionPeriod: 'December 2017 – October 2018',
    substancesCovered: [
      'Alcohol',
      'Cannabis',
      'Opioids',
      'Cocaine',
      'Amphetamine Type Stimulants (ATS)',
      'Sedatives (non-medical use only)',
      'Inhalants',
      'Hallucinogens',
    ],
  },
}

/** Helper: get state data for a given state name and substance */
export function getStateData(
  substanceName: string,
  stateName: string
) {
  const substance = governmentBaseline2018.substances.find(
    (s) => s.substance === substanceName || s.label.toLowerCase() === substanceName.toLowerCase()
  )
  return substance?.states.find(
    (st) => st.state.toLowerCase() === stateName.toLowerCase()
  ) ?? null
}

/** Helper: get Uttarakhand data for all substances */
export function getUttarakhandData() {
  return governmentBaseline2018.substances.map((sub) => ({
    substance: sub.substance,
    label: sub.label,
    data: sub.states.find((s) => s.state === 'Uttarakhand') ?? null,
    indiaData: sub.india,
  }))
}
