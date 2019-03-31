
function AgenteDao(connection) {
    this._connection = connection
}

AgenteDao.prototype.agentLogin = function (callback) {
    this._connection.query("select \"date\"(aa_event_time) as \"Start Date\", "
        + "  \"time\"(aa_event_time) as \"Start Time\", "
        + "  \"time\"(aa_event_time)+aa_event_duration as \"End time\","
        + "   ( EXTRACT (epoch from aa_event_duration )) as timeInSec "
        + "   from tblagentactivity, tblusers u "
        + " where aa_event_type = 0 "
        + " and aa_event_time >= '2018-06-18' "
        + " and aa_event_time <= (\"date\"('2018-06-20') + interval '24 hours') "
        + " and aa_agent_id = u.user_id "
        + " and u.user_login = '221' "
        + " and aa_event_duration!='00:00:00' "
        + " order by \"time\"(aa_event_time) ", callback)
}

AgenteDao.prototype.agentMissedCall = function (callback) {
    this._connection.query("select \"date\"(aa_event_time) as \"Start Date\", "
        + " \"time\"(aa_event_time) as \"Start Time\",  "
        + " \"time\"(aa_event_time)+aa_event_duration as \"End time\", "
        + "  ( EXTRACT (epoch from aa_event_duration )) as timeInSec "
        + " from tblagentactivity, tblusers u "
        + " where aa_event_type = 0 "
        + " and aa_event_time >= '2018-06-18' "
        + " and aa_event_time <= (\"date\"('2018-06-18') + interval '24 hours') "
        + " and aa_agent_id = u.user_id "
        + " and u.user_login = '221' "
        + " and aa_event_duration!='00:00:00' "
        + " order by \"time\"(aa_event_time)", callback)
}


AgenteDao.prototype.agentTempoPausa = function (callback) {
    this._connection.query("select  \"date\"(aa_event_time) as \"Start Date\", "
        + " \"time\"(aa_event_time) as \"Start Time\", "
        + " \"time\"(aa_event_time)+aa_event_duration as \"End time\", "
        + " case when aa_event_data NOT IN ( select ''||tblbreakscc.break_id from tblbreakscc)  then ' - - - ' else "
        + " ( select tblbreakscc.break_name from tblbreakscc where ''||tblbreakscc.break_id=aa_event_data) end as break_name, "
        + " case when aa_event_data NOT IN ( select ''||tblbreakscc.break_id from tblbreakscc) then 0 else "
        + " ( select tblbreakscc.break_default_interval_minutes from tblbreakscc where ''||tblbreakscc.break_id=aa_event_data) end as break_default_interval_minutes, "
        + " aa_event_duration as duration, "
        + " ( EXTRACT (epoch from aa_event_duration )) as timeInSec "
        + " from tblagentactivity, tblusers u "
        + " where aa_event_type = 2 /* On Break*/ "
        + " and aa_event_time >= '2018-06-19' /* From Date */ "
        + " and aa_event_time <= (\"date\"('2018-06-19') + interval '24 hours') /* To Date */ "
        + " and aa_agent_id = u.user_id "
        + " and u.user_login = '221' /* Agent Login */ "
        + " and aa_event_duration!='00:00:00' "
        + " order by \"time\"(aa_event_time)", callback)
}


AgenteDao.prototype.agentStatusAll = function (callback) {
    this._connection.query("select u.user_surname,u.user_id, "
        /*
        case aa_event_type
        when 0 then 0 --'Logged'
        when 2 then 2 --'On Break'
        when 4 then 4 --'Work'
        when 6 then 6 --'Missed Call'
        when 8 then 8 --'Screen Pop'
        */
        + " aa_event_type as office_status, "
        + " \"time\"(aa_event_time) as \"Start\", "
        + " \"time\"(aa_event_time)+aa_event_duration as \"End\", "
        + " (aa_event_duration) as duration "
        + " from tblagentactivity, tblusers u "
        + " where aa_event_type in (0,2,4,6,8) "
        + " and aa_event_time >= '2018-06-18' -- from date "
        + " and aa_event_time <= (\"date\"('2018-06-18') + interval '24 hours') -- to date "
        + " and aa_agent_id = u.user_id "
        + " and aa_event_duration!='00:00:00' "
        + " and  ((( EXTRACT (epoch from aa_event_duration ))>2 AND aa_event_type IN (4,8)) OR aa_event_type NOT IN (4,8)) "
        + " order by aa_event_time", callback)
}


AgenteDao.prototype.agentStatusByUsuario = function (callback) {
    this._connection.query("select aa_id, "
        + " aa_agent_id, "
        + " aa_event_type, "
        + " case aa_event_type "
        + " when 0  then 'Logged' "
        + " when 2  then 'On Break' "
        + " when 4  then 'Work Time' "
        + " when 6 then 'Missed Call Start' "
        + " when 8 then 'Screen Pop' "
        + " end as office_status, "

        + " case aa_event_type "
        + " when 0 then aa_event_time end as \"LogInStartT\", "
        + " case aa_event_type "
        + "  when 0 then aa_event_time+aa_event_duration end as \"LogOutEndT\", "

        + " case aa_event_type "
        + " when 2 then aa_event_time end as \"BreakStartStartT\", "
        + " case aa_event_type "
        + " when 2 then aa_event_time+aa_event_duration end as \"BreakEndEndT\", "

        + " case aa_event_type "
        + " when 4 then aa_event_time end as \"WTSStartT\", "
        + " case aa_event_type "
        + " when 4 then aa_event_time+aa_event_duration end as \"WTEEndT\", "

        + "  case aa_event_type "
        + " when 6 then aa_event_time end as \"MCSStartT\", "
        + " case aa_event_type "
        + " when 6 then aa_event_time+aa_event_duration end as \"MCEEndT\", "

        + " case aa_event_type "
        + "  when 8 then aa_event_time end as \"ScreenPopStartT\", "
        + " case aa_event_type "
        + " when 8 then aa_event_time+aa_event_duration end as \"ScreenPopEndT\", "
        + "  5 as X, "
        + " aa_event_duration as duration "
        + " from tblagentactivity,tblusers u "
        + " where aa_event_type in (0,2,4,6,8) -- office statuses "
        + "  and aa_event_time >= '2018-06-18' -- from date "
        + "  and aa_event_time <= (\"date\"('2018-06-20') + interval '24 hours') -- to date "
        + "        and aa_agent_id = u.user_id "
        + "  and u.user_login = '221' -- agent login name "
        + "  and aa_event_duration!='00:00:00' "
        + "  and ( EXTRACT (epoch from aa_event_duration ))>2 "
        + " order by aa_event_time ", callback)
}

AgenteDao.prototype.agentStatusByUsuario2 = function (callback) {
    this._connection.query("select aa_id, aa_agent_id, aa_event_type as office_status, "
        + "  \"time\"(aa_event_time) as \"Start Time\",  "
        + " \"time\"(aa_event_time)+aa_event_duration as \"End time\", "
        + " \"date\"(aa_event_time) as \"Start Date\",  "
        + " aa_event_duration as duration "
        + " from tblagentactivity, tblusers u "
        + "  where aa_event_type in (0,2,4,6,8) /*Office statuses*/ "
        + " and aa_event_time >= '2018-06-18' /*From date*/ "
        + " and aa_event_time <= (\"date\"('2018-06-20') + interval '24 hours') /*To date*/ "
        + "  and aa_agent_id = u.user_id "
        + " and u.user_login = '221' /*agent login name*/ "
        + " and aa_event_duration!='00:00:00' "
        + "  and  ((( EXTRACT (epoch from aa_event_duration ))>2 AND aa_event_type IN (4,8)) OR aa_event_type NOT IN (4,8)) "
        + " order by aa_event_time", callback)
}

AgenteDao.prototype.agentWorkTime = function (callback) {
    this._connection.query("select \"date\"(aa_event_time) as \"Start Date\", "
        + " \"time\"(aa_event_time) as \"Start Time\", "
        + " aa_event_duration as duration, "
        + " \"time\"(aa_event_time)+aa_event_duration as \"End time\", "
        + " ( EXTRACT (epoch from aa_event_duration )) as timeInSec "
        + " from tblagentactivity, tblusers u "
        + " where (aa_event_type = 4) /* Work Time*/ "
        /* MR I11256 removed Screen Pop : OR aa_event_type = 8*/
        + " and aa_event_time >= '2018-06-18' /* From Date */ "
        + " and aa_event_time <= (\"date\"('2018-06-20') + interval '24 hours') /* To Date */ "
        + " and aa_agent_id = u.user_id "
        + " and u.user_login = '221' /* Agent Login */ "
        + " and aa_event_duration!='00:00:00' "
        + " and ( EXTRACT (epoch from aa_event_duration ))>2 "
        + " order by \"time\"(aa_event_time);", callback)
}

AgenteDao.prototype.agentCallPercentage = function (callback) {
    this._connection.query("select  u.\"user_firstname\", u.\"user_surname\",u.user_login, "
        + "	count (cc.\"cc_call_id\")  as \"NumberOfCalls\", "
        + "	sum (cc.\"cc_talk_time\") as \"Total Talk Time\" "
        + " from tblcallscc cc, tblcalls,tblusers u "
        + "  where cc.\"cc_agent_id\" = u.\"user_id\" "
        + "	and u.user_is_agent=1 "
        + " 	and cc.\"cc_call_id\" = tblcalls.\"call_id\" "
        + "	and tblcalls.\"call_start_time\" >= '2018-06-18' "
        + "	and tblcalls.\"call_start_time\" <= (\"date\"('2018-06-20') + interval '24 hours') "
        + " group by  u.\"user_firstname\", u.\"user_surname\",u.user_login ", callback)
}

AgenteDao.prototype.agentCallQueueSpecific = function (callback) {
    this._connection.query("select  u.\"user_firstname\", u.\"user_surname\", "
        + "	u.user_login, "
        + "	count (cc.\"cc_call_id\")  as \"NumberOfCalls\", "
        + "	sum (cc.\"cc_talk_time\") as \"Total Talk Time\" "
        + " from tblcallscc cc, tblcalls,tblusers u,tblqueues "
        + " where cc.\"cc_agent_id\" = u.\"user_id\" "
        + "	and u.user_is_agent=1 "
        + "	and cc.\"cc_call_id\" = tblcalls.\"call_id\" "
        + "	and tblcalls.\"call_start_time\" >= '2018-06-18' "
        + "	and tblcalls.\"call_start_time\" <= (\"date\"('2018-06-20') + interval '24 hours') "
        + "	and cc.\"cc_queue_id\" = tblqueues.queue_id "
        + "	and tblqueues.queue_name = 'Suporte Quality' "
        + "  group by  u.\"user_firstname\", u.\"user_surname\",u.user_login", callback)
}

AgenteDao.prototype.agentGos = function (callback) {
    this._connection.query("select  avg ( cc1.\"cc_gos\"), EXTRACT (HOUR FROM c1.\"call_start_time\")||':00 - '||(EXTRACT (HOUR FROM c1.\"call_start_time\")+1)||':00' as \"label\" "
        + "	from tblcallscc cc1, tblcalls c1,tblusers u1 where "
        + "	c1.\"call_start_time\" >= '2018-06-18' "
        + "	and c1.\"call_start_time\" <= (\"date\"('2018-06-19') + interval '24 hours') "
        + " 	and cc1.\"cc_call_id\" = c1.\"call_id\" "
        + "	and cc1.\"cc_agent_id\" = u1.\"user_id\" "
        + " 	and u1.\"user_login\"= '221' "
        + " 	group by EXTRACT (HOUR FROM c1.\"call_start_time\")  "
        + " 	order by  EXTRACT (HOUR FROM c1.\"call_start_time\")", callback)
}

AgenteDao.prototype.agentGosDaily = function (callback) {
    this._connection.query("select  avg ( cc1.\"cc_gos\"),\"date\"(c1.\"call_start_time\"), EXTRACT (HOUR FROM c1.\"call_start_time\")||':00 - '||(EXTRACT (HOUR FROM c1.\"call_start_time\")+1)||':00' as \"label\" "
        + "	from tblcallscc cc1, tblcalls c1,tblusers u1 where  "
        + "	c1.\"call_start_time\" >= '2018-06-18' "
        + "	and c1.\"call_start_time\" <= (\"date\"('2018-06-20') + interval '24 hours') "
        + "	and cc1.\"cc_call_id\" = c1.\"call_id\" "
        + "	and cc1.\"cc_agent_id\" = u1.\"user_id\" "
        + "	and u1.\"user_login\"= '221' "
        + "	group by EXTRACT (HOUR FROM c1.\"call_start_time\"),\"date\"(c1.\"call_start_time\") "
        + "	order by  EXTRACT (HOUR FROM c1.\"call_start_time\")", callback)
}

AgenteDao.prototype.agentPerformanceDetails = function (callback) {
    this._connection.query("select count (cc.\"cc_call_id\")  as \"NumberOfCalls\", "
        + "	((\"int4\"(avg(cc.\"cc_pickup_time\")))* '1 seconds'::interval) as \"Avg Pickup Time\", "
        + "	((\"int4\"(avg(cc.\"cc_talk_time\")))* '1 seconds'::interval) as \"Avg Talk Time\",	avg(cc.\"cc_gos\") as \"Avg GOS\" "
        + " from tblcallscc cc, tblcalls,tblusers u,tblqueues q where cc.\"cc_agent_id\" = u.\"user_id\" "
        + "	and cc.\"cc_queue_id\"=q.\"queue_id\" "
        + "	and cc.\"cc_call_id\" = tblcalls.\"call_id\" "
        + "	and \"date\"(tblcalls.\"call_start_time\") >= \"date\"('2018-06-18') "
        + "	and \"date\"(tblcalls.\"call_start_time\") <= \"date\"('2018-06-20') "
        + " 	and \"time\"(tblcalls.\"call_start_time\") >= \"time\"(to_timestamp('00:00:00', 'HH24:MI:SS')) "
        + "	and \"time\"(tblcalls.\"call_start_time\") <= \"time\"(to_timestamp('23:59:00', 'HH24:MI:SS')) "
        + "	and u.\"user_login\"= '221'", callback)
}

AgenteDao.prototype.agentPrivateCall = function (callback) {
    this._connection.query("select u.user_firstname,u.user_surname,u.user_extension,u.user_login, "
        + " case when u.user_department_id IN (select department_id from tbldepartments) "
        + "	then (select department_name from tbldepartments "
        + "	where department_id=u.user_department_id "
        + "	) else ' - - - ' end as department_name, "
        + "	sum (ch.ch_talk_time_seconds) as \"Total Talk Time\", "
        + "	count (ch.ch_call_id) as \"NumberOfCalls\" "
        + "from tblcallhistory ch,tblusers u "
        + "where  ch.ch_start_time >= '2018-06-18' "
        + "and ch.ch_start_time <= (\"date\"('2018-06-20') + interval '24 hours') "
        /* and ch.ch_called_number not in (select qe.queue_huntgroup from tblqueues qe)*/
        + "and ch.ch_cc_call_id = 0 /*private call*/ "
        + "and ch.ch_user_id= u.user_id "
        + "group by u.user_firstname, u.user_surname,u.user_login,u.user_extension,u.user_department_id "
        + "ORDER BY u.user_firstname, u.user_surname,u.user_login", callback)
}

AgenteDao.prototype.agentPrivateCallPerAgent = function (callback) {
    this._connection.query("select \"date\"(ch.ch_start_time) as \"Date of Call\","
        + " \"time\"(ch.ch_start_time) as \"Time of Call\", "
        + " getprotectedcallnumber(getcallnumber(ch.ch_called_number)) as ch_called_number, "
        + " getprotectedcallnumber(getcallnumber(ch.ch_calling_number)) as ch_calling_number, "
        + " ch.ch_direction, ch.ch_talk_time_seconds, cc_contact_firstname, cc_contact_surname, cc_contact_company "
        + " from tblcallhistory ch left outer join tblcontactcache on ch.ch_contact_cache_id=cc_entry_id,tblusers u "
        + "  where  ch.ch_start_time >= '2018-06-18' /*From date*/ "
        + " and ch.ch_start_time <= (\"date\"('2018-06-19') + interval '24 hours') /* To date*/ "
        /* --and ch.ch_called_number not in (select qe.queue_huntgroup from tblqueues qe)*/
        + "  and ch.ch_cc_call_id = 0 /*private calls*/ "
        + "and ch.ch_user_id = u.user_id "
        + " and u.user_login= '221' /*User login*/", callback)
}

AgenteDao.prototype.agentPropertiesQueue = function (callback) {
    this._connection.query("select aq_user_id,	aq_queue_id,queue_name,aq_agent_type,aq_callback,aq_start_calls,aq_start_seconds,aq_worktime "
        + " from tblagentqueues,tblqueues "
        + " where queue_id=aq_queue_id "
        + " order by aq_user_id", callback)
}


AgenteDao.prototype.agentAllUserCallsByAgent = function (callback) {
    this._connection.query("select \"date\"(ch.ch_start_time) as \"Day_of_Call\", "
        + "  \"time\"(ch.ch_start_time) as \"Start_Time\", "
        + " \"time\"(ch.ch_end_time) as \"End_Time\", "
        + " getprotectedcallnumber(getcallnumber(ch.ch_called_number)) as ch_called_number, "
        + " getprotectedcallnumber(getcallnumber(ch.ch_calling_number)) as ch_calling_number, "
        + " ch.ch_talk_time_seconds as \"Talk_Time\", "
        + " ch.ch_internal_external as \"INT\", "
        + " ch.ch_direction, "
        + " cc_contact_firstname, cc_contact_surname, cc_contact_company "
        + "  from tblcallhistory ch left outer join tblcontactcache on ch.ch_contact_cache_id=cc_entry_id, tblusers u,tblswitches s "
        + "  where u.user_id=ch.ch_user_id "
        + " and ch.ch_start_time >= '2018-06-18' /*From date*/ "
        + "  and ch.ch_start_time <= (\"date\"('2018-06-19') + interval '24 hours') /*To date*/ "
        + "  and u.user_login='221' /*User login*/ "
        + " order by 1,2", callback)
}

AgenteDao.prototype.agentAllUserCalls = function (callback) {
    this._connection.query("select \"date\"(ch.ch_start_time) as \"Day_of_Call\", "
        + " \"time\"(ch.ch_start_time) as \"Start_Time\","
        + " \"time\"(ch.ch_end_time) as \"End_Time\", "
        + " getprotectedcallnumber(getcallnumber(ch.ch_called_number)) as ch_called_number,"
        + " getprotectedcallnumber(getcallnumber(ch.ch_calling_number)) as ch_calling_number,"
        + " ch.ch_talk_time_seconds as \"Talk_Time\", "
        + " ch.ch_internal_external as \"INT\", ch.ch_direction,"
        + " cc_contact_firstname, cc_contact_surname, cc_contact_company"
        + " from tblcallhistory ch left outer join tblcontactcache on ch.ch_contact_cache_id=cc_entry_id, tblusers u"
        + " where u.user_id=ch.ch_user_id"
        + " and ch.ch_start_time >= '2018-06-18' /*From date*/"
        + " and ch.ch_start_time <= (\"date\"('2018-06-19') + interval '24 hours') /*To date*/"
        + "  and u.user_login='221' /* user login*/ "
        + " order by 1,2", callback)
}

AgenteDao.prototype.agentAllUserCalls2 = function (callback) {
    this._connection.query("select \"date\"(ch.ch_start_time) as \"Day_of_Call\", "
        + " \"time\"(ch.ch_start_time) as \"Start_Time\", "
        + " \"time\"(ch.ch_end_time) as \"End_Time\",  "
        + " getprotectedcallnumber(getcallnumber(ch.ch_called_number)) as ch_called_number, "
        + " getprotectedcallnumber(getcallnumber(ch.ch_calling_number)) as ch_calling_number, "
        + " ch.ch_talk_time_seconds as \"Talk_Time\", "
        + " ch.ch_internal_external as \"INT\", ch.ch_direction, "
        + " cc_contact_firstname, cc_contact_surname, cc_contact_company "

        + " from tblcallhistory ch left outer join tblcontactcache on ch.ch_contact_cache_id=cc_entry_id, tblusers u "
        + "  where u.user_id=ch.ch_user_id "
        + " and ch.ch_start_time >= '2018-06-18' /*From date*/ "
        + " and ch.ch_start_time <= (\"date\"('2018-06-19') + interval '24 hours') /*To date*/ "
        + " and u.user_login='221' /* user login*/ "
        + " order by 1,2", callback)
}



module.exports = function () {
    return AgenteDao
}