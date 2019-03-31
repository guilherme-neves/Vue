
function RelatorioDao(connection) {
    this._connection = connection
   
}

RelatorioDao.prototype.list = function (callback) {
    this._connection.query("select * from tblusers", callback)
}

RelatorioDao.prototype.lista2 = function (callback) {
    this._connection.query("Select \"date\"(aa_event_time) as \"Start Date\" ,"
        + " \"time\"(aa_event_time) as \"Start Time\" , "
        + " \"time\"(aa_event_time)+aa_event_duration as \"End time\" ,"
        + " ( EXTRACT (epoch from aa_event_duration )) as timeInSec "
        + " from tblagentactivity , tblusers u "

        + "   where aa_event_type = 0 ", callback)
}

RelatorioDao.prototype.lista3 = function (callback) {
    this._connection.query("select \"date\"(aa_event_time) as \"Start Date\", "
        + " \"time\"(aa_event_time) as \"Start Time\", "
        + " \"time\"(aa_event_time)+aa_event_duration as \"End time\", "
        + "  ( EXTRACT (epoch from aa_event_duration )) as timeInSec "
        + "  from tblagentactivity, tblusers u "
        + "   where aa_event_type = 0 "
        + " and aa_event_time >= '2018-06-14' "
        + "  and aa_event_time <= (\"date\"('2018-06-14') + interval '24 hours') "
        + " and aa_agent_id = u.user_id "
        + "  and u.user_login = '221' "
        + " and aa_event_duration!='00:00:00' "
        + " order by \"time\"(aa_event_time) ", callback)
}


RelatorioDao.prototype.gos = function (callback) {
    this._connection.query("select  avg( cc1.\"cc_gos\"), EXTRACT (HOUR FROM c1.\"call_start_time\")||':00 - '||(EXTRACT (HOUR FROM c1.\"call_start_time\")+1)||':00' as \"label\" "
        + " from tblcallscc cc1, tblcalls c1,tblusers u1 where "
        + "	c1.\"call_start_time\" >= '2018-06-18' "
        + "	and c1.\"call_start_time\" <= (\"date\"('2018-06-18') + interval '24 hours')"
        + "	and cc1.\"cc_call_id\" = c1.\"call_id\" "
        + " and cc1.\"cc_agent_id\" = u1.\"user_id\" "
        + " and u1.\"user_login\"= '221' "
        + "group by EXTRACT (HOUR FROM c1.\"call_start_time\")"
        + "order by  EXTRACT (HOUR FROM c1.\"call_start_time\") ", callback)

}

RelatorioDao.prototype.calls = function (callback) {
    this._connection.query("select tblcallhistory.ch_user_id, "
        + "  getprotectedcallnumber(getcallnumber(tblcallhistory.ch_calling_number)) as ch_calling_number, "
        + " getprotectedcallnumber(getcallnumber(tblcallhistory.ch_called_number)) as ch_called_number, "
        + " tblcallhistory.ch_direction, "
        + " \"date\"(tblcallhistory.ch_start_time) as \"Date of Day\", "
        + "	\"time\"(tblcallhistory.ch_start_time) as \"Start Time\", "
        + "	\"time\"(tblcallhistory.ch_end_time) as \"End Time\", "
        + "	tblcallhistory.ch_talk_time_seconds, "
        + "	cc_contact_firstname, cc_contact_surname, cc_contact_company "
        + " from tblcallhistory left outer join tblcontactcache on ch_contact_cache_id=cc_entry_id "
        + " where tblcallhistory.ch_start_time >= '2018-06-18' /*From date*/ "
        + " and tblcallhistory.ch_start_time <= (\"date\"('2018-06-18') + interval '24 hours') /*To date*/ "
        + " and tblcallhistory.ch_user_id = '56' /* user ID*/ "
        + " order by \"time\"(tblcallhistory.ch_end_time)", callback)
}






module.exports = function () {
    return RelatorioDao;
}