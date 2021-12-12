/** THUMB opcodes */

// THUMB 1
var thumb_lsl_rrn = function(p){

  // Rd = Rs << nn
  var val = r[p[0]] = lshift(r[p[1]], p[2]);

  // if not LSL #0, update flag C
  if(p[2]){
    update_cpsr_c(p[0], val);
  }

  // update flags N, Z
  update_cpsr_n(p[0]);
  update_cpsr_z(p[0]);

  // Next
  r[15] += 2;
}

var thumb_lsr = function(p){

  // Rd = Rs >> nn
  var val = r[p[0]] = rshift(r[p[1]], p[2]);

  // Update flags
  update_cpsr_c(p[0], val);
  update_cpsr_n(p[0]);
  update_cpsr_z(p[0]);

  // Next
  r[15] += 2;
}

var thumb_asr = function(p){

  // Rd = Rs >> nn
  var val = r[p[0]] = r[p[1]] >> p[2];

  // Update flags
  update_cpsr_c(p[0], val);
  update_cpsr_n(p[0]);
  update_cpsr_z(p[0]);

  // Next
  r[15] += 2;
}

// THUMB 2

var thumb_add_rrr = function(p){

  // Rd = Rs + Rn
  var val = r[p[0]] = r[p[1]] + r[p[2]];

  // update flags
  update_cpsr_c(p[0], val);
  update_cpsr_n(p[0]);
  update_cpsr_z(p[0]);
  update_cpsr_v(p[0]);

  // Next
  r[15] += 2;
}

var thumb_sub_rrr = function(p){

  // Rd = Rs - Rn
  var val = r[p[0]] = r[p[1]] - r[p[2]];

  // Update flags
  update_cpsr_c(p[0], val, true);
  update_cpsr_v(p[0]);
  update_cpsr_n(p[0]);
  update_cpsr_z(p[0]);

  // Next
  r[15] += 2;
}

var thumb_add_rrn = function(p){

  // Rd = Rs + nn
  var val = r[p[0]] = r[p[1]] + p[2];

  // Update flags
  update_cpsr_c(p[0], val);
  update_cpsr_n(p[0]);
  update_cpsr_z(p[0]);
  update_cpsr_v(p[0]);

  // Next
  r[15] += 2;
}

var thumb_sub_rrn = function(p){

  // Rd = Rs - nn
  var val = r[p[0]] = r[p[1]] - p[2];
  // if(r[p[0]] < 0){                                    // write negarive numbers on 32bits signed
    // r[p[0]] = 0xFFFFFFFF + r[p[0]] + 1;
  // }
  // Update flags
  update_cpsr_c(r[p[0]], val, true);
  update_cpsr_v(p[0]);
  update_cpsr_n(p[0]);
  update_cpsr_z(p[0]);

  // Next
  r[15] += 2;
}

var thumb2_mov_rr = function(p){

  // Rd = Rs
  var val = r[p[0]] = r[p[1]];

  // Update flags
  update_cpsr_c(p[0], val);
  update_cpsr_n(p[0]);
  update_cpsr_z(p[0]);
  update_cpsr_v(p[0]);

  // Next
  r[15] += 2;
}

// THUMB 3

var thumb_mov_rn = function(p){

  // Rd = nn
  r[p[0]] = p[1];

  // update N flag
  update_cpsr_n(p[0]);

  // update Z flag
  update_cpsr_z(p[0]);

  // Next
  r[15] += 2;
}

var thumb_cmp_rn = function(p){

  // void = Rd - nn
  var val = r[16] = r[p[0]] - p[1];

  // Update flags
  update_cpsr_c(r[16], val);
  update_cpsr_v(16);
  update_cpsr_n(16);
  update_cpsr_z(16);

  // Next
  r[15] += 2;
}

var thumb_add_rn = function(p){

  // Rd = Rd + nn
  var val = r[p[0]] += p[1];

  // Update flags
  update_cpsr_c(p[0], val);
  update_cpsr_v(p[0]);
  update_cpsr_n(p[0]);
  update_cpsr_z(p[0]);

  // Next
  r[15] += 2;
}

var thumb_sub_rn = function(p){

  // Rd = Rd - nn
  var val = r[p[0]] = r[p[0]] - p[1];

  // Update flags
  update_cpsr_c(r[p[0]], val, true);
  update_cpsr_v(p[0]);
  update_cpsr_n(p[0]);
  update_cpsr_z(p[0]);

  // Next
  r[15] += 2;
}

// THUMB 4

var thumb_neg_rr = function(p){

  // Rd = - Rs
  var val = r[p[0]] = 0xFFFFFFFF - r[p[1]] + 1;

  // update flags
  update_cpsr_c(p[0], val);
  update_cpsr_v(p[0]);
  update_cpsr_n(p[0]);
  update_cpsr_z(p[0]);

  // Next
  r[15] += 2;
}

var thumb_cmp_rr = function(p){

  // void = Rd - Rs
  var val = r[16] = r[p[0]] - r[p[1]];

  // Update flags
  update_cpsr_c(16, val, true);
  update_cpsr_v(16);
  update_cpsr_n(16);
  update_cpsr_z(16);

  // Next
  r[15] += 2;
}

var thumb_orr = function(p){

  // Rd = Rd OR Rs
  r[p[0]] |= r[p[1]];

  // Update flags
  update_cpsr_n(p[0]);
  update_cpsr_z(p[0]);

  // Next
  r[15] += 2;
}

var thumb_mul = function(p){

  // Rd = Rd * Rs
  r[p[0]] *= r[p[1]];

  // Update flags
  update_cpsr_n(p[0]);
  update_cpsr_z(p[0]);

  // Next
  r[15] += 2;
}

var thumb_bic = function(p){

  // Rd = Rd AND NOT Rs
  r[p[0]] = r[p[0]] & (0xFFFFFFFF - r[p[1]]);

  // Update flags
  update_cpsr_n(p[0]);
  update_cpsr_z(p[0]);

  // Next
  r[15] += 2;
}

// THUMB 5

var thumb_add_rr = function(p){

  // Rd = Rd + Rs
  r[p[0]] += r[p[1]];

  // Next
  r[15] += 2;
}

var thumb5_mov_rr = function(p){

  // Rd = Rs
  r[p[0]] = r[p[1]];

  // Next
  r[15] += 2;
}

var thumb_nop = function(){

  // Next
  r[15] += 2;
}

var thumb_bx = function(p){

  // PC = Rd
  r[15] = r[p[0]] - 1;
}

// THUMB 6

var thumb_ldr_rn = function(p){

  // Rd = nn
  r[p[0]] = p[1];

  // Next
  r[15] += 2;
}

// THUMB 7

var thumb_str_rrr = function(p){
  // trace += "STR rrr";
  //trace += "STR r" + p[0] + ",=#0x" + p[1].toString(16);
  //r[p[0]] = p[1];                                     // Rd = WORD[SP + nn]
  //r[15] += 2;
}

var thumb_strb_rrr = function(p){

}

var thumb_ldr_rrr = function(p){
  //trace += "LDR r" + p[0] + ",=#0x" + p[1].toString(16);
  //r[p[0]] = p[1];                                     // Rd = WORD[SP + nn]
  //r[15] += 2;
}

var thumb_ldrb_rrr = function(){

}

// THUMB 8

var thumb_strh_rrr = function(p){

  // HALFWORD[Rb+Ro] = Rd
  mem(r[p[1]] + r[p[2]], 2, r[p[0]]);

  // Next
  r[15] += 2;
}

// THUMB 9

var thumb_str_rrn = function(p){

  // WORD[Rb+nn] = Rd
  mem(r[p[1]] + p[2], 4, r[p[0]]);

  // Next
  r[15] += 2;
}

var thumb_ldr_rrn = function(p){

  // Rd = WORD[Rb+nn]
  r[p[0]] = mem(r[p[1]] + p[2], 4);

  // Next
  r[15] += 2;
}

var thumb_strb_rrn = function(p){
}

var thumb_ldrb_rrn = function(p){
}

// THUMB 10

var thumb_strh_rrn = function(p){

  // HALFWORD[Rb+nn] = Rd
  mem(r[p[1]] + p[2], 2, r[p[0]]);

  // Next
  r[15] += 2;
}

var thumb_ldrh_rrn = function(p){
}

// THUMB 11

var thumb_str_spn = function(p){

  // WORD[SP+nn] = Rd
  mem(r[13] + p[1], 4, r[p[0]]);

  // Next
  r[15] += 2;
}

var thumb_ldr_spn = function(p){

  // Rd = WORD[SP+nn]
  r[p[0]] = mem(r[13] + p[1], 4);

  // Next
  r[15] += 2;
}

// THUMB 12

// THUMB 13

var thumb_add_spn = function(p){

  // SP = SP +/- nn
  r[13] += p[0];

  // Next
  r[15] += 2;
}

// THUMB 14

var thumb_push = function(p){

  // If LR is set
  if(p[1]){

    // Decrement R13
    r[13] -= 4;

    // Push LR
    mem(r[13], 4, r[14]);
  }

  // For Ri in Rlist
  for(var i = 7; i >= 0; i--){

    // If it's set
    if(b(p[0], i)){

      // decrement R13
      r[13] -= 4;

      // Push Ri
      mem(r[13], 4, r[i]);
    }
  }

  // Next
  r[15] += 2;
}

var thumb_pop = function(p){

  // For Ri in Rlist
  for(var i = 0; i < 8; i++){

    // If it's set
    if(b(p[0], i)){

      // Pop SP
      r[i] = mem(r[13], 4);

      // increment R13
      r[13] += 4;
    }
  }

  // If PC is set
  if(p[1]){

    // Pop PC
    mem(r[13], 4, r[14]);

    // increment R13
    r[13] += 4;
  }

  // Next
  r[15] += 2;
}

// THUMB 15

var thumb_stmia = function(p){

  // For each register Ri in Rlist
  for(var i = 0; i < 8; i++){

    // If it is set
    if(b(p[1], i)){

      // [Rb] = Ri
      mem(r[p[0]], 4, r[i]);
    }
  }

  // Increment Rb
  r[p[0]] += 4;

  // Next
  r[15] += 2;
}

var thumb_ldmia = function(p){

  // For each register Ri in Rlist
  for(var i = 0; i < 8; i++){

    // If it is set
    if(b(p[1], i)){

      // Ri = [Rb]
      r[i] = mem(r[p[0]], 4);

      // increment Rb
      r[p[0]] += 4;
    }
  }

  // Next
  r[15] += 2;
}

// THUMB 16

var thumb_beq = function(p){

  // If CPSR flag Z is set
  if(b(cpsr[0], 30)){

    // PC = address
    r[15] = p[0];
  }
  else{

    // Next
    r[15] += 2;
  }
}

var thumb_bne = function(p){

  // If CPSR flag Z isn't set
  if(!b(cpsr[0], 30)){

    // detect loops
    detect_loop(p[0]);

    // PC = address
    r[15] = p[0];
  }

  else {

    // End loop
    loop_end();

    // Next
    r[15] += 2;
  }
}

var thumb_bcs = function(p){

  // If CPSR flag C is set
  if(b(cpsr[0], 29)){

    // detect loops
    if(p[0] < r[15] && p[0] > r[15] - 20){
      loops++;
    }

    // Branch
    r[15] = p[0];
  }
  else{

    // Stop loop
    if(loops > 0){
      loops = -1;
    }

    // Next
    r[15] += 2;
  }
}

var thumb_bcc = function(p){}

var thumb_bmi = function(p){}

var thumb_bpl = function(p){}

var thumb_bvs = function(p){}

var thumb_bvc = function(p){}

var thumb_bhi = function(p){}

var thumb_bls = function(p){}

var thumb_bge = function(p){}

var thumb_blt = function(p){

  // if CPSR.N != CPSR.V:
  if(b(cpsr[0], 31) !== b(cpsr[0], 28)){

    // detect loops
    detect_loop(p[0]);

    // PC = address
    r[15] = p[0];
  }
  else{

    // End loop
    loop_end();

    // Next
    r[15] += 2;
  }
}

var thumb_bgt = function(p){}

var thumb_ble = function(p){

  // if CPSR.Z is set or CPSR.N != CPSR.V
  if(b(cpsr[0], 30) || (b(cpsr[0], 31) !== b(cpsr[0], 28))){

    // detect loops
    detect_loop(p[0]);

    // PC = address
    r[15] = p[0];
  }
  else {

    // End loop
    loop_end();

    // Next
    r[15] += 2;
  }
}

// THUMB 17

// THUMB 18

var thumb_b = function(p){

  // PC = PC + 4 + offset
  r[15] = p[0];
}

// THUMB 19

var thumb_bl = function(p){

  // LR = PC
  r[14] = (r[15] + 4) | 0x1;

  // PC = address
  r[15] = p[0];
}

